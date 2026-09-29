from django.urls import path

from . import views


urlpatterns = [

    # ============================================================
    # HOME
    # ============================================================

    path("", views.home, name="home"),

    # ============================================================
    # AUTHENTICATION
    # ============================================================

    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register_view, name="register"),

    # ============================================================
    # PROFILE / DASHBOARD
    # ============================================================

    path("profile/", views.profile, name="profile"),
    path("dashboard/", views.dashboard, name="dashboard"),

    # ============================================================
    # SEARCH
    # ============================================================

    path("search/", views.search, name="search"),

    # ============================================================
    # CATEGORIES
    # ============================================================

    path("categories/", views.category_list, name="category_list"),
    
    path("categories/<slug:slug>/", views.category_detail, name="category_detail",),

    # ============================================================
    # DESTINATIONS
    # ============================================================

    path("destinations/", views.destination_list, name="destination_list",),

    path("destinations/<slug:slug>/", views.destination_detail, name="destination_detail",),

    # ============================================================
    # TOURS / PACKAGES
    # ============================================================

    path("tours/", views.tour_list, name="tour_list"),

    path("tours/<slug:slug>/", views.tour_detail, name="tour_detail",),

    path("tours/<int:tour_id>/book/", views.create_booking, name="create_booking",),

    # ============================================================
    # GUIDES
    # ============================================================

    path("guides/", views.guide_list, name="guide_list"),

    path("guides/<int:pk>/", views.guide_detail, name="guide_detail",),

    # ============================================================
    # HOTELS
    # ============================================================

    path("hotels/", views.hotel_list, name="hotel_list"),

    path("hotels/<int:pk>/", views.hotel_detail, name="hotel_detail",),

    path("hotels/<int:hotel_id>/book/", views.hotel_booking_create, name="hotel_booking_create",),

    # ============================================================
    # BOOKINGS
    # ============================================================

    path("bookings/", views.booking_list, name="booking_list"),

    path("bookings/<int:pk>/", views.booking_detail, name="booking_detail",),

    path("bookings/<int:pk>/cancel/", views.cancel_booking, name="cancel_booking",),

    path("bookings/<int:booking_id>/cancellation-receipt/", views.cancellation_receipt, name="cancellation_receipt",),

    # ============================================================
    # PAYMENTS
    # ============================================================

    path("payments/<int:booking_id>/", views.payment, name="payment",),

    path("payments/<int:booking_id>/verify/", views.payment_verify, name="payment_verify",),

    path("payments/<int:booking_id>/cash/", views.cash_payment, name="cash_payment",),

    path("payments/<int:booking_id>/success/", views.payment_success, name="payment_success",),

    path("payments/<int:booking_id>/failed/", views.payment_failed, name="payment_failed",),

    path("payments/<int:booking_id>/return/", views.payment_return, name="payment_return",),

    path("payments/<int:booking_id>/return-receipt/", views.payment_return_receipt, name="payment_return_receipt",),

    path("payments/razorpay/webhook/", views.razorpay_webhook, name="razorpay_webhook",),

    # ============================================================
    # REVIEWS
    # ============================================================

    path("tours/<int:tour_id>/review/", views.create_review, name="create_review",),

    # ============================================================
    # AI ASSISTANT
    # ============================================================

    path("ai/assistant/", views.ai_travel_assistant, name="ai_travel_assistant",),

    # ============================================================
    # BUS
    # ============================================================

    path("transport/buses/", views.bus_list, name="bus_list",),

    path("transport/buses/<int:pk>/", views.bus_detail, name="bus_detail",),

    path("transport/buses/<int:pk>/seats/", views.bus_seat_selection, name="bus_seat_selection",),

    path("transport/buses/<int:bus_id>/book/", views.bus_booking_create, name="bus_booking_create",),

    # ============================================================
    # FLIGHT
    # ============================================================

    path("transport/flights/", views.flight_list, name="flight_list",),

    path("transport/flights/<int:pk>/", views.flight_detail, name="flight_detail",),

    path("transport/flights/<int:flight_id>/seats/", views.flight_seat_selection, name="flight_seat_selection",),

    path("transport/flights/<int:flight_id>/book/", views.flight_booking_create, name="flight_booking_create",),

    # ============================================================
    # TRAIN
    # ============================================================

    path("transport/trains/", views.train_list, name="train_list",),

    path("transport/trains/<int:pk>/", views.train_detail,  name="train_detail",),

    path("transport/trains/<int:pk>/coaches/", views.train_coach_selection, name="train_coach_selection",),

    path("transport/trains/<int:train_id>/book/", views.train_booking_create, name="train_booking_create",),
]
