from django.contrib import admin

from .models import (Tour_Category, Destination, Tour, Hotel, Booking, Guide, Payment, Review, Bus, Flight, Train,)


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = (
        "destination_name",
        "destination_location",
        "destination_mood",
        "destination_season",
        "destination_created_at",
    )

    list_filter = (
        "destination_mood",
        "destination_season",
    )

    search_fields = (
        "destination_name",
        "destination_location",
        "destination_desc",
    )

    prepopulated_fields = {
        "destination_slug": ("destination_name",)
    }


admin.site.register(Tour_Category)
admin.site.register(Tour)
admin.site.register(Hotel)
admin.site.register(Booking)
admin.site.register(Guide)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(Bus)
admin.site.register(Flight)
admin.site.register(Train)

