# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.views import View

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

import json

from .forms import PostForm
from models import Post

# Create your views here.
def PostView(request):
	template_name = "index.html"

	if request.method == "POST":
		print request.body

		data = json.loads(request.body.decode('utf-8'))
		print data
		print data['data']

		name = data['data'].get('name');
		description = data['data'].get('description')

		print name, description

		new_post = Post(name=name, description=description)
		new_post.save()


		return redirect('index')

	return render(request, 'index.html')
		