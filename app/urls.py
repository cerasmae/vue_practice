from django.conf.urls import url
import views

from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
	url(r'^$', views.Index.as_view(), name="index"),
    url(r'^posts/$', csrf_exempt(views.PostView.as_view()), name="posts"),
]
