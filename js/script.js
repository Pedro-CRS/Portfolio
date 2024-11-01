$(document).ready(function () {
	$("#mainContent").addClass("load");

	let initPage = (callback) => {
		switchThemeFunction(function () {
			headersEvenets(function () {
				homeSectionEvents(function () {
					contactSectionEvents(function () {
						$("#mainContent").removeClass("load");

						if (callback)
							callback();
					});
				});
			});
		});
	}

	let switchThemeFunction = (callback) => {
		const themeSwitcher = $("#theme-switcher");
		const darkThemeLink = $("#dark-theme");
		const lightThemeLink = $("#light-theme");
		const body = $("body");

		const savedTheme = localStorage.getItem("theme");
		setTheme(savedTheme);

		function setTheme(theme) {
			var setedTheme = "";

			if (theme === "light" || theme === null) {
				body.removeClass("dark");
				body.addClass("light");

				setedTheme = "light";

				themeSwitcher.find("i").removeClass("bx bx-sun");
				themeSwitcher.find("i").addClass("bx bx-moon");

				darkThemeLink.prop("disabled", true);
				lightThemeLink.prop("disabled", false);
			}
			else {
				body.removeClass("light");
				body.addClass("dark");

				setedTheme = "dark";

				themeSwitcher.find("i").removeClass("bx bx-moon");
				themeSwitcher.find("i").addClass("bx bx-sun");

				darkThemeLink.prop("disabled", false);
				lightThemeLink.prop("disabled", true);
			}

			localStorage.setItem("theme", setedTheme);
		}

		themeSwitcher.off("click");
		themeSwitcher.on("click", function (ev) {
			const currentTheme = body.hasClass("dark") ? "light" : "dark";
			setTheme(currentTheme);
		});

		if (callback)
			callback();
	}

	let headersEvenets = (callback) => {
		const menuHamburguer = $(".menu-hamburguer");
		menuHamburguer[0].addEventListener("click", function () {
			const nav = $(".nav-responsive")[0];

			menuHamburguer.toggleClass("change");

			if (menuHamburguer.hasClass("change"))
				nav.style.display = "block";
			else
				nav.style.display = "none";
		});

		$(".nav > a, .nav-responsive > a").off("click");
		$(".nav > a, .nav-responsive > a").on("click", function (ev) {
			scrollToSection(ev);
		});

		if (callback)
			callback();
	}

	function homeSectionEvents(callback) {
		$(".btnGitHub").off("click");
		$(".btnGitHub").on("click", function (ev) {
			window.open("https://github.com/Pedro-CRS", "_blank");
		});

		$(".btnLinkedIn").off("click");
		$(".btnLinkedIn").on("click", function (ev) {
			window.open("https://www.linkedin.com/in/pedro-henrique-24607a154/", "_blank");
		});

		$(".btnWhatsApp").off("click");
		$(".btnWhatsApp").on("click", function (ev) {
			window.open("https://wa.me/5517982273946", "_blank");
		});

		$(".btnResume").off("click");
		$(".btnResume").on("click", function (ev) {
			window.open("https://docs.google.com/document/d/14GqAn3WyQJ0ef5SSA-7ehPWOWRf0dZ5QWQePiKYDvSc/export?format=pdf");
		});

		if (callback)
			callback();
	}

	function skilsSectionEvents(callback) {

		if (callback)
			callback();
	}

	function contactSectionEvents(callback) {
		$("#phoneInput").off("keyup");
		$("#phoneInput").on("keyup", function (ev) {
			if (!this.value) {
				this.value = "";
				return;
			}

			this.value = this.value.replace(/\D/g, '');
			this.value = this.value.replace(/(\d{2})(\d)/, "($1) $2");
			this.value = this.value.replace(/(\d)(\d{4})$/, "$1-$2");
			return this.value;
		});

		$("#sendEmailBtn").off("click");
		$("#sendEmailBtn").on("click", function (ev) {
			validateForm();
		});

		if (callback)
			callback();
	}

	function validateForm() {
		var validate = true;
		$("#contact-form :input").removeClass("is-invalid");

		const name = $("#fullNameInput");
		const email = $("#emailInput");
		const phone = $("#phoneInput");
		const message = $("#messageInput");

		if (!name.val() || name.val() === "") {
			validate = false;
			name.addClass("is-invalid");
		}

		if (!email.val() || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/.test(email.val()) == false)) {
			validate = false;
			email.addClass("is-invalid");
		}

		if (!message.val() || message.val() === "") {
			validate = false;
			message.addClass("is-invalid");
		}

		if (validate) {
			$("#mainContent").addClass("load");

			data = {
				name: name.val(),
				email: email.val(),
				contact: phone.val(),
				message: message.val(),
				_subject: $("#defaultMessage").val()
			};

			formAction(data);
		}
	}

	function formAction(data) {
		$.ajax({
			url: "https://formsubmit.co/ajax/82d6662d7ed5f73438a8cf3c69643ca7",
			method: "POST",
			dataType: "json",
			data: data,
			success: function (dataR) {
				name.val("");
				email.val("");
				phone.val("");
				message.val("");

				$("#mainContent").removeClass("load");

				Swal.fire({
					position: "center",
					icon: "success",
					title: "Sucesso...",
					text: "Eu recebi o seu email, te respondo assim que possivel!",
					showConfirmButton: true,
				});
			},
			error: function (xhr, status, error) {
				$("#mainContent").removeClass("load");

				Swal.fire({
					position: "center",
					icon: "error",
					title: "Oops...",
					text: "Alguma coisa deu errado ao enviar a mensagem, tente novamente!",
					showConfirmButton: true,
				});
			},
		});
	}

	initPage();
});