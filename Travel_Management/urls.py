from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect


def legacy_index_redirect(request):
    return redirect("home")


urlpatterns = [
    path("admin/", admin.site.urls),

    path("", include("Travel.urls")),

    # Redirect old standalone index.html requests to Django homepage
    path("index.html", legacy_index_redirect, name="legacy_index"),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )