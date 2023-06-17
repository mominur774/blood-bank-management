from django.contrib import admin
from django.urls import include, path
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('api/v1/hospital/', include('hospital.api.v1.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

schema_view = get_schema_view(
   openapi.Info(
      title="Polls API",
      default_version='v1',
      description="Polls API description",
   ),
   public=True,
   permission_classes=(AllowAny,),
)

urlpatterns += path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='api_playground'),