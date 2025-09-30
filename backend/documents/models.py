from django.conf import settings
from django.db import models


class Document(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    file = models.FileField(
        upload_to="documents/"
    )
    drive_file_id = models.CharField(max_length=255, null=True, blank=True)
    # This is the link for viewing in a browser
    file_url = models.URLField(max_length=1024, null=True, blank=True)
    # This is the direct download link for the server
    web_content_link = models.URLField(max_length=1024, null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.name} uploaded by {self.user}"


class SummarizationSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name="summaries")
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    summary_text = models.TextField()

    def __str__(self):
        return f"{self.title} ({self.user.username})"


class SummarizationMessage(models.Model):
    session = models.ForeignKey(SummarizationSession, on_delete=models.CASCADE, related_name="messages")
    role = models.CharField(max_length=10, choices=[("user", "User"), ("assistant", "Assistant")])
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.role}] {self.content[:30]}"