from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.utils import timezone

from .models import Booking


# ============================================================
# USER REGISTRATION FORM
# ============================================================

class RegisterForm(UserCreationForm):

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(
            attrs={
                "class": "form-control",
                "placeholder": "Enter your email",
            }
        ),
    )

    first_name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Enter your first name",
            }
        ),
    )

    last_name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Enter your last name",
            }
        ),
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password1",
            "password2",
        ]

    def clean_email(self):
        email = self.cleaned_data.get("email")

        if User.objects.filter(email=email).exists():
            raise forms.ValidationError(
                "An account with this email already exists."
            )

        return email


# ============================================================
# BUS / TRAIN / FLIGHT BOOKING FORM
# ============================================================

class TransportBookingForm(forms.ModelForm):

    travel_date = forms.DateField(
        required=True,
        widget=forms.DateInput(
            attrs={
                "type": "date",
                "class": "form-control",
            }
        ),
        input_formats=["%Y-%m-%d"],
    )

    class Meta:
        model = Booking

        fields = [
            "travel_date",
            "selected_seats",
            "selected_coach",
        ]

    def clean_travel_date(self):
        travel_date = self.cleaned_data.get("travel_date")

        if not travel_date:
            raise forms.ValidationError(
                "Please select a travel date."
            )

        if travel_date < timezone.localdate():
            raise forms.ValidationError(
                "Please select today or a future date."
            )

        return travel_date