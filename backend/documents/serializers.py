import os
from rest_framework import serializers
from .models import Document, SummarizationSession, SummarizationMessage


# ---------------- DOCUMENT SERIALIZER ---------------- #
class DocumentSerializer(serializers.ModelSerializer):
    # ✅ Return actual accessible URL (Google Drive link) if available
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ["id", "user", "file", "file_url", "uploaded_at"]
        read_only_fields = ["user", "uploaded_at"]

    def create(self, validated_data):
        # Ensure user is always set
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    def validate_file(self, value):
        allowed_extensions = [
            ".txt", ".pdf", ".docx", ".csv", ".json",
            ".html", ".htm", ".xml",
            ".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"
        ]
        ext = os.path.splitext(value.name)[-1].lower()
        if ext not in allowed_extensions:
            raise serializers.ValidationError(f"❌ Unsupported file type: {ext}")
        return value

    def get_file_url(self, obj):
        """
        Return the publicly accessible URL.
        - If your view uploads to Google Drive and returns a shareable link,
          make sure the 'file' field stores that URL or provide a method to get it.
        """
        if getattr(obj, "file_url", None):
            return obj.file_url
        try:
            return obj.file.url
        except Exception:
            return None


# ---------------- SUMMARIZATION SERIALIZERS ---------------- #
class SummarizationMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummarizationMessage
        fields = "__all__"


class SummarizationSessionSerializer(serializers.ModelSerializer):
    messages = SummarizationMessageSerializer(many=True, read_only=True)

    class Meta:
        model = SummarizationSession
        fields = "__all__"
