/* =========================================================
   YATRANEST AI TRAVEL ASSISTANT
   GLOBAL GEMINI CHATBOT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        "use strict";


        /* =================================================
           ELEMENTS
        ================================================= */

        const aiButton =
            document.getElementById(
                "yatraAIButton"
            );


        const aiChat =
            document.getElementById(
                "yatraAIChat"
            );


        const aiClose =
            document.getElementById(
                "yatraAIClose"
            );


        const aiForm =
            document.getElementById(
                "yatraAIForm"
            );


        const aiInput =
            document.getElementById(
                "yatraAIInput"
            );


        const aiSend =
            document.getElementById(
                "yatraAISend"
            );


        const aiMessages =
            document.getElementById(
                "yatraAIMessages"
            );


        const aiTyping =
            document.getElementById(
                "yatraAITyping"
            );


        const aiSuggestions =
            document.querySelectorAll(
                "[data-ai-prompt]"
            );


        /* =================================================
           SAFETY CHECK
        ================================================= */

        if (
            !aiButton ||
            !aiChat
        ) {

            console.warn(
                "YatraNest AI: AI elements not found."
            );

            return;

        }


        /* =================================================
           OPEN CHAT
        ================================================= */

        function openAIChat() {

            /*
               Remove HTML hidden attribute.
            */

            aiChat.hidden = false;


            /*
               Add CSS open state.
            */

            aiChat.classList.add(
                "ai-open"
            );


            /*
               Accessibility.
            */

            aiChat.setAttribute(
                "aria-hidden",
                "false"
            );


            aiButton.setAttribute(
                "aria-expanded",
                "true"
            );


            /*
               Focus input.
            */

            setTimeout(
                function () {

                    if (aiInput) {

                        aiInput.focus();

                    }

                },
                250
            );

        }


        /* =================================================
           CLOSE CHAT
        ================================================= */

        function closeAIChat() {

            aiChat.classList.remove(
                "ai-open"
            );


            aiChat.setAttribute(
                "aria-hidden",
                "true"
            );


            aiButton.setAttribute(
                "aria-expanded",
                "false"
            );


            /*
               Wait for animation,
               then completely hide.
            */

            setTimeout(
                function () {

                    if (
                        !aiChat.classList.contains(
                            "ai-open"
                        )
                    ) {

                        aiChat.hidden = true;

                    }

                },
                260
            );

        }


        /* =================================================
           AI BUTTON CLICK
        ================================================= */

        aiButton.addEventListener(
            "click",
            function () {

                if (
                    aiChat.classList.contains(
                        "ai-open"
                    )
                ) {

                    closeAIChat();

                } else {

                    openAIChat();

                }

            }
        );


        /* =================================================
           CLOSE BUTTON
        ================================================= */

        if (aiClose) {

            aiClose.addEventListener(
                "click",
                function () {

                    closeAIChat();

                }
            );

        }


        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    aiChat.classList.contains(
                        "ai-open"
                    )
                ) {

                    closeAIChat();

                }

            }
        );


        /* =================================================
           CSRF TOKEN
        ================================================= */

        function getCSRFToken() {

            const csrfInput =
                document.querySelector(
                    "[name=csrfmiddlewaretoken]"
                );


            if (csrfInput) {

                return csrfInput.value;

            }


            /*
               Fallback for Django cookie.
            */

            const cookies =
                document.cookie.split(";");


            for (
                let i = 0;
                i < cookies.length;
                i++
            ) {

                const cookie =
                    cookies[i].trim();


                if (
                    cookie.startsWith(
                        "csrftoken="
                    )
                ) {

                    return decodeURIComponent(
                        cookie.substring(
                            "csrftoken=".length
                        )
                    );

                }

            }


            return "";

        }


        /* =================================================
           ADD AI / USER MESSAGE
        ================================================= */

        function addMessage(
            message,
            type
        ) {

            const wrapper =
                document.createElement(
                    "div"
                );


            if (
                type === "user"
            ) {

                wrapper.className =
                    "yatra-ai-message user-message";


                const bubble =
                    document.createElement(
                        "div"
                    );


                bubble.className =
                    "yatra-ai-bubble";


                bubble.textContent =
                    message;


                wrapper.appendChild(
                    bubble
                );

            } else {

                wrapper.className =
                    "yatra-ai-message ai-message";


                const avatar =
                    document.createElement(
                        "div"
                    );


                avatar.className =
                    "yatra-ai-message-avatar";


                avatar.innerHTML =
                    '<i class="fa-solid fa-wand-magic-sparkles"></i>';


                const content =
                    document.createElement(
                        "div"
                    );


                content.className =
                    "yatra-ai-message-content";


                const name =
                    document.createElement(
                        "div"
                    );


                name.className =
                    "yatra-ai-message-name";


                name.textContent =
                    "YatraNest AI";


                const bubble =
                    document.createElement(
                        "div"
                    );


                bubble.className =
                    "yatra-ai-bubble";


                bubble.textContent =
                    message;


                content.appendChild(
                    name
                );


                content.appendChild(
                    bubble
                );


                wrapper.appendChild(
                    avatar
                );


                wrapper.appendChild(
                    content
                );

            }


            aiMessages.appendChild(
                wrapper
            );


            scrollMessagesToBottom();

        }


        /* =================================================
           SCROLL
        ================================================= */

        function scrollMessagesToBottom() {

            if (!aiMessages) {

                return;

            }


            aiMessages.scrollTop =
                aiMessages.scrollHeight;

        }


        /* =================================================
           TYPING
        ================================================= */

        function showTyping() {

            if (!aiTyping) {

                return;

            }


            aiTyping.hidden = false;


            scrollMessagesToBottom();

        }


        function hideTyping() {

            if (!aiTyping) {

                return;

            }


            aiTyping.hidden = true;

        }


        /* =================================================
           SEND MESSAGE
        ================================================= */

        async function sendAIMessage(
            message
        ) {

            const cleanMessage =
                String(
                    message || ""
                ).trim();


            if (
                !cleanMessage
            ) {

                return;

            }


            /*
               Make sure chat is open.
            */

            if (
                !aiChat.classList.contains(
                    "ai-open"
                )
            ) {

                openAIChat();

            }


            /*
               Add user message.
            */

            addMessage(
                cleanMessage,
                "user"
            );


            /*
               Clear textarea.
            */

            if (aiInput) {

                aiInput.value = "";

                aiInput.style.height =
                    "auto";

            }


            /*
               Disable send button.
            */

            if (aiSend) {

                aiSend.disabled =
                    true;

            }


            /*
               Show typing.
            */

            showTyping();


            try {

                const response =
                    await fetch(
                        "/ai/assistant/",
                        {
                            method: "POST",

                            credentials:
                                "same-origin",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "X-CSRFToken":
                                    getCSRFToken(),

                                "X-Requested-With":
                                    "XMLHttpRequest"

                            },

                            body:
                                JSON.stringify(
                                    {
                                        message:
                                            cleanMessage
                                    }
                                )

                        }
                    );


                /*
                   HTTP error.
                */

                if (
                    !response.ok
                ) {

                    let errorText =
                        "HTTP " +
                        response.status;


                    try {

                        const errorData =
                            await response.json();


                        if (
                            errorData.error
                        ) {

                            errorText =
                                errorData.error;

                        }

                    } catch (e) {

                        /* Ignore JSON parsing error */

                    }


                    throw new Error(
                        errorText
                    );

                }


                /*
                   Parse JSON.
                */

                const data =
                    await response.json();


                hideTyping();


                /*
                   Successful Gemini response.
                */

                if (
                    data.success &&
                    data.reply
                ) {

                    addMessage(
                        data.reply,
                        "ai"
                    );

                } else {

                    addMessage(
                        data.error ||
                        "Sorry, I couldn't process that request right now.",
                        "ai"
                    );

                }


            } catch (error) {

                console.error(
                    "YatraNest AI Error:",
                    error
                );


                hideTyping();


                addMessage(
                    "I'm having trouble connecting to the YatraNest AI service right now. Please try again.",
                    "ai"
                );

            } finally {

                if (aiSend) {

                    aiSend.disabled =
                        false;

                }


                if (aiInput) {

                    aiInput.focus();

                }

            }

        }


        /* =================================================
           FORM SUBMIT
        ================================================= */

        if (aiForm) {

            aiForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!aiInput) {

                        return;

                    }


                    sendAIMessage(
                        aiInput.value
                    );

                }
            );

        }


        /* =================================================
           QUICK SUGGESTIONS
        ================================================= */

        aiSuggestions.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const prompt =
                            button.getAttribute(
                                "data-ai-prompt"
                            );


                        if (!prompt) {

                            return;

                        }


                        sendAIMessage(
                            prompt
                        );

                    }
                );

            }
        );


        /* =================================================
           ENTER TO SEND
           SHIFT + ENTER = NEW LINE
        ================================================= */

        if (aiInput) {

            aiInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" &&
                        !event.shiftKey
                    ) {

                        event.preventDefault();


                        if (aiForm) {

                            aiForm.requestSubmit();

                        }

                    }

                }
            );


            /* =============================================
               AUTO RESIZE
            ============================================== */

            aiInput.addEventListener(
                "input",
                function () {

                    this.style.height =
                        "auto";


                    this.style.height =
                        Math.min(
                            this.scrollHeight,
                            105
                        ) + "px";

                }
            );

        }


        /* =================================================
           INITIAL STATE
           
           CHAT IS ALWAYS CLOSED WHEN PAGE LOADS.
        ================================================= */

        aiChat.classList.remove(
            "ai-open"
        );


        aiChat.hidden = true;


        aiChat.setAttribute(
            "aria-hidden",
            "true"
        );


        aiButton.setAttribute(
            "aria-expanded",
            "false"
        );


    }
);