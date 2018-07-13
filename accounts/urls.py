from django.conf.urls import url
import views

urlpatterns = [
    url(r'^signup/$', views.sign_up, name="sign_up"),
]
