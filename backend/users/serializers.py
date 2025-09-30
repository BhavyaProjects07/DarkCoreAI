from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User, OneTimePassword


class SignupSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["full_name", "email", "password", "confirm_password"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        if len(data["password"]) < 6:
            raise serializers.ValidationError({"password": "Password must be at least 6 characters long."})
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            full_name=validated_data.get("full_name", ""),  # your model must have this field
            is_active=False,  # inactive until OTP verified
        )

        # create OTP
        otp = OneTimePassword.create_for_user(user)
        self.context["otp"] = otp.code
        return user


class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": "No user found with this email."})

        otp = OneTimePassword.objects.filter(user=user, code=data["code"]).order_by("-created_at").first()
        if not otp:
            raise serializers.ValidationError({"code": "Invalid OTP."})
        if not otp.is_valid():
            raise serializers.ValidationError({"code": "OTP has expired or already used."})

        data["user"] = user
        data["otp_obj"] = otp
        return data


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if not user:
            raise serializers.ValidationError({"detail": "Invalid email or password."})
        if not user.is_active:
            raise serializers.ValidationError({"detail": "Please verify your email with the OTP before logging in."})
        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email"]
