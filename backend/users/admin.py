from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, OneTimePassword


class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ("id", "email", "full_name", "is_active", "is_staff", "is_superuser")
    list_filter = ("is_active", "is_staff", "is_superuser")
    ordering = ("email",)
    search_fields = ("email", "full_name")

    fieldsets = (
        (None, {"fields": ("email", "password", "full_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "full_name", "password1", "password2", "is_active", "is_staff", "is_superuser"),
        }),
    )
@admin.register(OneTimePassword)
class OTPAdmin(admin.ModelAdmin):
    list_display = ("user", "code", "purpose", "is_used", "created_at", "expires_at")
    list_filter = ("purpose", "is_used", "created_at")
    search_fields = ("user__email", "code")
admin.site.register(User, UserAdmin)
