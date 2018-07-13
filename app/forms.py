from django import forms

class PostForm(forms.Form):
	name = forms.CharField(label="Enter A Name", max_length=255)
	description = forms.CharField()