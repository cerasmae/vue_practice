# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.views import View
from django.http import HttpResponse
from django.core import serializers

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

import json

from .forms import PostForm
from models import Post

# Create your views here.

### Class View ###
class Index(View):
	template_name = 'index.html'

	def get(self, request):
		return render(request, template_name=self.template_name)


class PostView(View):

	def get(self, request):
		data = serializers.serialize("json", Post.objects.all().order_by("-pk"))
		return HttpResponse(data, content_type="application/json")

	def post(self, request):
		data = json.loads(request.body.decode('utf-8'))
		new_post = Post(name=data.get('name'), description=data.get('description'))
		new_post.save()

		response = serializers.serialize("json", [new_post])
		return HttpResponse(response, content_type="application/json")


	def delete(self, request):
		data = json.loads(request.body.decode('utf-8'))
		pk = data.get('pk')
		Post.objects.get(pk=pk).delete()

		response = json.dumps({'status': 'ok'})
		return HttpResponse(response, content_type="application/json")





### Function View ###
# def PostView(request):
# 	template_name = "index.html"

# 	if request.method == "POST":
# 		print request.POST
# 		form = PostForm(request.POST)

# 		data = json.loads(request.body.decode('utf-8'))

# 		name = data['data'].get('name');
# 		description = data['data'].get('description')

# 		new_post = Post(name=name, description=description)
# 		new_post.save()


# 		return redirect('index')

# 	if request.method == "GET":

# 		posts = Post.objects.all()

# 		# posts_data = []

# 		# print posts

# 		# for pd in posts:
# 		# 	print pd
# 			# posts_data.append({
# 			# 	name: pd.name,
# 			# 	pk: pd.pk,
# 			# 	description: pd.description
# 			# 	})

# 		return HttpResponse(json.dumps({data: posts}), content_type="application/json")

# 	return render(request, 'index.html')
	
