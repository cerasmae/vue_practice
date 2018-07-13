from django.conf.urls import url
import views

from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^$', csrf_exempt(views.PostView), name="index"),
]
