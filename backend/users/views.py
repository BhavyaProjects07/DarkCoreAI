from django.conf import settings
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from .models import OneTimePassword, User
from .serializers import SignupSerializer, VerifyOtpSerializer, LoginSerializer, UserSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save(is_active=False)
        otp = OneTimePassword.create_for_user(user)
        send_mail(
            "Verify your email",
            f"Your OTP is {otp.code}. It expires in 10 minutes.",
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        return Response({"message": "OTP sent to your email"}, status=201)
    return Response(serializer.errors, status=400)


@api_view(["POST"])
@permission_classes([AllowAny])
def verify_otp(request):
    serializer = VerifyOtpSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data["user"]
        otp_obj = serializer.validated_data["otp_obj"]

        otp_obj.is_used = True
        otp_obj.save(update_fields=["is_used"])

        user.is_active = True
        user.save(update_fields=["is_active"])

        # Auto-login: generate token immediately
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "detail": "Email verified & logged in",
            "token": token.key,
            "user": UserSerializer(user).data
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token


class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        # Generate token here (e.g., JWT or session)
        token = "your_token_logic_here"
        user_data = UserSerializer(user).data
        return Response({
            "token": token,
            "username": user_data["full_name"],  # <-- Add this line
            "email": user_data["email"]
        })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    Token.objects.filter(user=request.user).delete()
    return Response({"detail": "Logged out successfully"})


@api_view(["POST"])
@permission_classes([AllowAny])
def resend_otp(request):
    email = request.data.get("email")
    if not email:
        return Response({"detail": "Email required."}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=404)

    if user.is_active:
        return Response({"detail": "User already verified."}, status=400)

    otp = OneTimePassword.create_for_user(user)
    send_mail(
        "Resend OTP - Verify your account",
        f"Your new OTP is {otp.code}. It expires in 10 minutes.",
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )
    return Response({"detail": "New OTP sent to email."}, status=200)





from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests
import os

@api_view(["POST"])
@permission_classes([AllowAny])
def google_login(request):
    """
    Body: { "credential": "<ID_TOKEN_FROM_GOOGLE>" }
    Returns: { token, username, email }
    """
    id_token_from_client = request.data.get("credential")
    if not id_token_from_client:
        return Response({"detail": "Missing credential (ID token)."}, status=400)

    try:
        # Verify the token against your Google client ID (audience)
        idinfo = google_id_token.verify_oauth2_token(
            id_token_from_client,
            google_requests.Request(),
            os.getenv("GOOGLE_CLIENT_ID")
        )

        # Token is valid. Extract user info.
        email = idinfo.get("email")
        full_name = idinfo.get("name") or ""
        email_verified = idinfo.get("email_verified", False)

        if not email:
            return Response({"detail": "Google token missing email."}, status=400)

        # Get or create user; mark active (Google email is already verified)
        user, created = User.objects.get_or_create(
            email=email,
            defaults={"full_name": full_name, "is_active": True}
        )
        if created:
            # No password for social accounts
            user.set_unusable_password()
            user.is_active = True
            user.save(update_fields=["password", "is_active"])
        else:
            # If user exists but inactive from OTP flow, activate on Google login
            if not user.is_active and email_verified:
                user.is_active = True
                user.save(update_fields=["is_active"])

        token_obj, _ = Token.objects.get_or_create(user=user)

        return Response({
            "token": token_obj.key,
            "username": user.full_name or full_name or email.split("@")[0],
            "email": user.email
        }, status=200)

    except ValueError:
        # Invalid token
        return Response({"detail": "Invalid Google token."}, status=400)
