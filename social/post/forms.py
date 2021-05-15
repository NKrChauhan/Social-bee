from django import forms
from .models import Post

# not in use now

class PostForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea)
    class Meta:
        model = Post
        fields = ['content']
