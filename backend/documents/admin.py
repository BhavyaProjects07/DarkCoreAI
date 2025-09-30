from django.contrib import admin

# Register your models here.
from documents.models import Document,SummarizationMessage,SummarizationSession

admin.site.register(Document)
admin.site.register(SummarizationSession)
admin.site.register(SummarizationMessage)