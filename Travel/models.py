from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone


# =========================================================
# CATEGORY MODEL
# =========================================================

class Tour_Category(models.Model):

    category_name = models.CharField(max_length=200, unique=True)

    category_slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)

    category_desc = models.TextField(blank=True, null=True)

    category_image = models.ImageField(upload_to="categories/", blank=True, null=True)

    category_created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.category_slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.category_name


# =========================================================
# DESTINATION MODEL
# =========================================================

class Destination(models.Model):

    MOOD_CHOICES = [
        ("mountain", "Mountain Silence"),
        ("coastal", "Coastal Escape"),
        ("culture", "Culture & History"),
        ("nature", "Nature & Wildlife"),
    ]

    SEASON_CHOICES = [
        ("summer", "Summer"),
        ("monsoon", "Monsoon"),
        ("autumn", "Autumn"),
        ("winter", "Winter"),
    ]

    destination_name = models.CharField(
        max_length=200,
        unique=True
    )

    destination_slug = models.SlugField(
        max_length=200,
        unique=True,
        blank=True
    )

    destination_desc = models.TextField(
        blank=True,
        null=True
    )

    destination_location = models.CharField(
        max_length=200
    )

    destination_image = models.ImageField(
        upload_to="destinations/",
        blank=True,
        null=True
    )

    destination_mood = models.CharField(
        max_length=20,
        choices=MOOD_CHOICES,
        blank=True,
        null=True,
        help_text="Choose the travel mood for this destination."
    )

    destination_season = models.CharField(
        max_length=20,
        choices=SEASON_CHOICES,
        blank=True,
        null=True,
        help_text="Choose the best travel season for this destination."
    )

    destination_created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        self.destination_slug = slugify(
            self.destination_name
        )

        super().save(*args, **kwargs)

    def __str__(self):
        return self.destination_name



# =========================================================
# TOUR MODEL
# =========================================================

class Tour(models.Model):

    tour_name = models.CharField(max_length=200, unique=True)

    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="tours")

    category = models.ForeignKey(Tour_Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="tours")

    tour_slug = models.SlugField(max_length=200, unique=True, blank=True)

    tour_desc = models.TextField(blank=True, null=True)

    tour_duration = models.PositiveIntegerField(help_text="Duration in days")

    tour_price = models.DecimalField(max_digits=10, decimal_places=2)

    available_seats = models.PositiveIntegerField(default=20)

    tour_start_date = models.DateField(blank=True, null=True)

    tour_end_date = models.DateField(blank=True, null=True)

    tour_image = models.ImageField(upload_to="tours/", blank=True, null=True)

    is_active = models.BooleanField(default=True)

    tour_created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.tour_slug = slugify(self.tour_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.tour_name


# =========================================================
# GUIDE MODEL
# =========================================================

class Guide(models.Model):

    guide_name = models.CharField(max_length=200)

    guide_email = models.EmailField(unique=True)

    guide_phone = models.CharField(max_length=20, blank=True, null=True)

    guide_photo = models.ImageField(upload_to="guides/", blank=True, null=True)

    guide_location = models.CharField(max_length=200, blank=True, null=True)

    guide_languages = models.CharField(max_length=300, blank=True, null=True, help_text="Example: English, Hindi, Bengali")

    guide_experience = models.PositiveIntegerField(default=0, help_text="Experience in years")

    guide_specialization = models.CharField(max_length=300, blank=True, null=True)

    guide_bio = models.TextField(blank=True, null=True)

    is_available = models.BooleanField(default=True)

    guide_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.guide_name


# =========================================================
# HOTEL MODEL
# =========================================================

class Hotel(models.Model):

    hotel_name = models.CharField(max_length=200)

    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="hotels")

    hotel_description = models.TextField(blank=True, null=True)

    hotel_address = models.CharField(max_length=300)

    hotel_phone = models.CharField(max_length=20, blank=True, null=True)

    hotel_email = models.EmailField(blank=True, null=True)

    hotel_image = models.ImageField(upload_to="hotels/", blank=True, null=True)

    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)

    hotel_rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)

    total_rooms = models.PositiveIntegerField(default=1)

    available_rooms = models.PositiveIntegerField(default=1)

    amenities = models.TextField(blank=True, null=True)

    is_active = models.BooleanField(default=True)

    hotel_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.hotel_name


# =========================================================
# BOOKING MODEL
# =========================================================

class Booking(models.Model):

    BOOKING_STATUS = [
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("CANCELLED", "Cancelled"),
        ("COMPLETED", "Completed"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # TOUR / HOTEL
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, blank=True, null=True)

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, blank=True, null=True)

    # TRANSPORT
    bus = models.ForeignKey("Bus", on_delete=models.SET_NULL, blank=True, null=True, related_name="bookings")

    flight = models.ForeignKey("Flight", on_delete=models.SET_NULL, blank=True, null=True, related_name="bookings")

    train = models.ForeignKey("Train", on_delete=models.SET_NULL, blank=True, null=True, related_name="bookings")

    # SELECTED TRANSPORT DETAILS
    selected_seats = models.TextField(blank=True, null=True)

    selected_coach = models.CharField(max_length=50, blank=True, null=True)

    booking_date = models.DateTimeField(auto_now_add=True)

    travel_date = models.DateField(blank=True, null=True)

    number_of_people = models.PositiveIntegerField(default=1)

    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    booking_status = models.CharField(max_length=20, choices=BOOKING_STATUS, default="PENDING")

    special_request = models.TextField(blank=True, null=True)


    def __str__(self):
        return f"Booking #{self.id}"

    def clean(self):
        super().clean()

        if self.travel_date:
            if self.travel_date < timezone.localdate():
                raise ValidationError({
                "travel_date": "You cannot select a past date."
            })


# =========================================================
# PAYMENT MODEL
# =========================================================
class Payment(models.Model):

    PAYMENT_METHODS = [
        ("CASH", "Cash"),
        ("CARD", "Credit/Debit Card"),
        ("UPI", "UPI"),
        ("NET_BANKING", "Net Banking"),
        ("WALLET", "Wallet"),
        ("ONLINE", "Online Payment"),
    ]

    PAYMENT_STATUS = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
        ("REFUNDED", "Refunded"),
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")

    transaction_id = models.CharField(max_length=200, unique=True, blank=True, null=True)

    razorpay_order_id = models.CharField(max_length=200, unique=True, blank=True, null=True)

    payment_method = models.CharField(max_length=30, choices=PAYMENT_METHODS)

    amount = models.DecimalField(max_digits=12, decimal_places=2)

    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default="PENDING")

    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment #{self.id}"

# =========================================================
# REVIEW MODEL
# =========================================================

class Review(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="reviews")

    rating = models.PositiveIntegerField(default=5)

    review_title = models.CharField(max_length=200, blank=True, null=True)

    review_text = models.TextField(blank=True, null=True)

    review_date = models.DateTimeField(auto_now_add=True)

    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.tour} - {self.rating} Stars"


# =========================================================
# BUS MODEL
# =========================================================

class Bus(models.Model):
    bus_name = models.CharField(max_length=150, blank=True, null=True)
    bus_number = models.CharField(max_length=50, unique=True)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    total_seats = models.PositiveIntegerField(default=40)
    available_seats = models.PositiveIntegerField(default=40)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="buses/", blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.bus_name or 'Bus'} - {self.source} to {self.destination}"

# =========================================================
# FLIGHT MODEL
# =========================================================

class Flight(models.Model):
    airline = models.CharField(max_length=150)
    flight_number = models.CharField(max_length=50, unique=True)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    total_seats = models.PositiveIntegerField(default=180)
    available_seats = models.PositiveIntegerField(default=180)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="flights/", blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.airline} {self.flight_number} - {self.source} to {self.destination}"

# =========================================================
# TRAIN MODEL
# =========================================================

class Train(models.Model):
    train_name = models.CharField(max_length=150, blank=True, null=True)
    train_number = models.CharField(max_length=50, unique=True)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    total_seats = models.PositiveIntegerField(default=100)
    available_seats = models.PositiveIntegerField(default=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="trains/", blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.train_name or 'Train'} - {self.source} to {self.destination}"