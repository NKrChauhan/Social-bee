from django import forms
from .models import Post


class PostForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea)
    class Meta:
        model = Post
        fields = ['content']

    # def clean_data(self):
    #     if(self.changed_data['content'].trim() != ""):
    #         return raise ValidationError(_('Invalid value: no data in content'), code='invalid')
    #     return self.cleaned_data
