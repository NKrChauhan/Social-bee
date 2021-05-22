from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import os
from django.contrib.auth.hashers import make_password
import random
# Create your models here.

gender = {
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Other')
}


def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3910209312)
    _, ext = get_filename_ext(filename)
    final_filename = '{new_filename}_{instancevar}{ext}'.format(
        new_filename=new_filename, ext=ext, instancevar=instance.id)
    return "User/Profile/{final_filename}".format(
        final_filename=final_filename
    )


class UserManager(BaseUserManager):
    def create(self, email, username, password=None):
        if not email or not username:
            raise ValueError("Uesr model must have username and email")
        user_obj = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user_obj.set_password(password)
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, username, password=None):
        user_obj = self.create(
            email=email, username=username, password=password
        )
        user_obj.staff = True
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, email, username, password=None):
        user_obj = self.create_staffuser(
            email=email, username=username, password=password
        )
        user_obj.admin = True
        user_obj.save(using=self._db)
        return user_obj


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address',
                              max_length=255,
                              unique=True,)
    username = models.CharField(max_length=20, unique=True)
    profile_picture = models.ImageField(
        upload_to=upload_image_path, null=True, blank=True)
    gender = models.CharField(
        choices=gender, max_length=1, null=True, blank=True)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    objects = UserManager()

    # both username and email is required but email will be used as login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    @property
    def is_active(self):
        return self.active

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        self.password = make_password(self.password, None, 'pbkdf2_sha256')
        super(User, self).save(*args, **kwargs)
