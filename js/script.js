$(document).ready(function () {
	$("#mainContent").addClass("load");
	$("header a, header :button").prop("tabindex", "-1");
	$(".social-media :button").prop("tabindex", "-1");
	$(".projects-container :button").prop("tabindex", "-1");
	$("button.dropdown-button").prop("tabindex", "-1");

	var theTippy = false;

	let initPage = (callback) => {
		getBrowserLanguage(function (fileName, langCode) {
			changeLanguage(fileName, langCode, function (tippyMsg) {
				languagetippyCreator(tippyMsg, function () {
					switchThemeFunction(function () {
						headersEvenets(function () {
							homeSectionEvents(function () {
								projectSectionsEvent(function () {
									contactSectionEvents(function () {
										window.scrollTo({ top: 0, behavior: "auto" });
										$("#mainContent").removeClass("load hidden");

										if (callback)
											callback();
									});
								});
							});
						});
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
		var otherCountrySrc = "";

		const savedTheme = localStorage.getItem("theme");
		setTheme(savedTheme);

		function setTheme(theme) {
			var setedTheme = "";
			var unSetedTheme = "";

			if (theme === "light" || theme === null) {
				body.removeClass("dark");
				body.addClass("light");

				setedTheme = "light";
				unSetedTheme = "dark";

				themeSwitcher.find("i").removeClass("bx bx-sun");
				themeSwitcher.find("i").addClass("bx bx-moon");

				darkThemeLink.prop("disabled", true);
				lightThemeLink.prop("disabled", false);

				otherCountrySrc = "../img/other_country_dark.svg";
			}
			else {
				body.removeClass("light");
				body.addClass("dark");

				setedTheme = "dark";
				unSetedTheme = "light";

				themeSwitcher.find("i").removeClass("bx bx-moon");
				themeSwitcher.find("i").addClass("bx bx-sun");

				darkThemeLink.prop("disabled", false);
				lightThemeLink.prop("disabled", true);

				otherCountrySrc = "../img/other_country_light.svg";
			}

			$(".dropdown-content > [data-country=other]").prop("src", otherCountrySrc);
			localStorage.setItem("theme", setedTheme);

			if (theTippy) {
				theTippy.setProps({
					theme: unSetedTheme
				});
			}
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
			window.open("https://github.com/Pedro-CRS", "_blank", "noopener, noreferrer");
		});

		$(".btnLinkedIn").off("click");
		$(".btnLinkedIn").on("click", function (ev) {
			window.open("https://www.linkedin.com/in/pedro-henrique-24607a154/", "_blank", "noopener, noreferrer");
		});

		$(".btnWhatsApp").off("click");
		$(".btnWhatsApp").on("click", function (ev) {
			window.open("https://wa.me/5517982273946", "_blank", "noopener, noreferrer");
		});

		$("#btnResume").off("click");
		$("#btnResume").on("click", function (ev) {
			if (!$("#language-switcher > .br-lang").hasClass("hidden"))
				window.open("https://drive.google.com/file/d/1wOEwJnMeNsR_q359qibV0IexmLoaw9tO/view");
			else /*if (!$("#language-switcher > .usa-lang").hasClass("hidden"))*/
				window.open("https://drive.google.com/file/d/1lqfJYJJhuGl-Fv2WC-CHJxNfLt1P3MNx/view");
		});

		if (callback)
			callback();
	}

	function contactSectionEvents(callback) {
		const phoneInput = $("#phoneInput");

		$(".dropdown-option").off("click");
		$(".dropdown-option").on("click", function () {
			$("#selected-flag").prop("src", this.src);

			phoneInput.val("");

			phoneInput.inputmask("remove");

			switch (this.dataset.country) {
				case "brazil":
					phoneInput.inputmask("+55 (99) 99999-9999");
					break;
				case "usa":
					phoneInput.inputmask("+1 (999) 999-9999");
					break;
				default:
					phoneInput.inputmask("Regex", {
						regex: "\\+?[0-9\\-\\(\\)\\s]{0,22}$"
						// max based in kp (North Korea) phone
					});
					break;
			}
		});

		phoneInput.inputmask("+55 (99) 99999-9999");

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
		var language = localStorage.getItem("language");
		var swalText = "";

		$.ajax({
			url: "https://formsubmit.co/ajax/82d6662d7ed5f73438a8cf3c69643ca7",
			method: "POST",
			dataType: "json",
			data: data,
			success: function (dataR) {
				$("#fullNameInput").val("");
				$("#emailInput").val("");
				$("#phoneInput").val("");
				$("#messageInput").val("");

				$("#mainContent").removeClass("load");

				if (language === "pt-")
					swalText = "Eu recebi o seu email, te respondo assim que possivel!";
				else if (language === "en-")
					swalText = "I received your email, I'll respond as soon as possible!";

				Swal.fire({
					position: "center",
					icon: "success",
					title: language === "pt-" ? "Sucesso..." : "Success...",
					text: swalText,
					showConfirmButton: true,
					allowOutsideClick: false,
					allowEscapeKey: false,
				});
			},
			error: function (xhr, status, error) {
				$("#mainContent").removeClass("load");

				if (language === "pt-")
					swalText = "Alguma coisa deu errado ao enviar a mensagem, tente novamente!";
				else if (language === "en-")
					swalText = "Something went wrong sending the message, try again!";

				Swal.fire({
					position: "center",
					icon: "error",
					title: "Oops...",
					text: swalText,
					showConfirmButton: true,
					allowOutsideClick: false,
					allowEscapeKey: false,
				});
			},
		});
	}

	function getBrowserLanguage(callback) {
		const language = localStorage.getItem("language") || navigator.language || navigator.languages[0];
		var fileLang = "";
		var langCode = "";

		if (language.startsWith("en-")) {
			fileLang = "english";
			langCode = "en-";
		}
		else if (language.startsWith("pt-")) {
			fileLang = "portuguese";
			langCode = "pt-";
		}
		else {
			fileLang = "english";
			langCode = "en-";
		}

		if (callback)
			callback(fileLang, langCode);
	}

	function changeLanguage(language, langCode, callback) {
		localStorage.setItem("language", langCode);

		$.getJSON(`../json/${language}.json`, function (jsonTranslations) {
			updateContentLanguage(jsonTranslations, function () {
				if (callback)
					callback(jsonTranslations.header.languageTippyMsg);
			});
		});
	}

	function updateContentLanguage(translations, callback) {
		// Header
		$(`a[href="#home"]`).text(translations.header.nav.home);
		$(`a[href="#services"]`).text(translations.header.nav.services);
		$(`a[href="#projects"]`).text(translations.header.nav.projects);
		$(`a[href="#skills"]`).text(translations.header.nav.skills);
		$(`a[href="#contact"]`).text(translations.header.nav.contact);
		$("img.br-lang").prop("alt", translations.header.brFlagAlt);
		$("img.usa-lang").prop("alt", translations.header.usaFlagAlt);

		// Home Section
		$(".home-content h3").text(translations.home.greeting);
		$(".home-content h1").text(translations.home.name);
		$(".home-content h3.bio").html(translations.home.bio);
		$(".home-content p").each(function (idx, elm) {
			elm.textContent = translations.home.intro[idx];
		});
		$("#btnResume").text(translations.home.resumeBtnText);
		$(".home-img > img").prop("alt", translations.home.profilePicAlt);

		// Serviços Section
		$(".services h2 span").text(translations.services.title);
		$(".services-card.webInfo h3").text(translations.services.web.title);
		$(".services-card.webInfo p").text(translations.services.web.description);

		$(".services-card.backendInfo h3").text(translations.services.backend.title);
		$(".services-card.backendInfo p").text(translations.services.backend.description);

		$(".services-card.mobileInfo h3").text(translations.services.mobile.title);
		$(".services-card.mobileInfo p").text(translations.services.mobile.description);

		// Projetos Section
		$(".projects h2 span").text(translations.projects.title);
		$(".project-card.proj1 h3").text(translations.projects.project1.name);
		$(".project-card.proj1 span").text(translations.projects.project1.extraInfo);
		$(".project-card.proj1 p").text(translations.projects.project1.description);
		$(".project-card.proj1 > #btnRep1").prop("title", translations.projects.project1.btnRepository);
		$(".project-card.proj1 > #btnDep1").prop("title", translations.projects.project1.btnDeploy);
		$(".project-card-image > img").prop("alt", translations.projects.projectsImgsAlt);
		$(".btnRepository").text(translations.projects.btnRepText);
		$(".btnDeploy").text(translations.projects.btnDepText);

		// Habilidades Section
		$(".skills h2 span").text(translations.skills.title);

		// Contato Section
		$(".contact h2 span").text(translations.contact.title);
		$(".contact h4").text(translations.contact.connect);
		$(".contact label").html(translations.contact.message);
		$("#fullNameInput").prop("placeholder", translations.contact.form.name_placeholder);
		$("#emailInput").prop("placeholder", translations.contact.form.email_placeholder);
		$("#phoneInput").prop("placeholder", translations.contact.form.phone_placeholder);
		$("#messageInput").prop("placeholder", translations.contact.form.message_placeholder);
		$("#sendEmailBtn").text(translations.contact.form.send_button);
		$(".contact-div h1.addressText").text(translations.contact.location);
		$(".contact-div p.addressText").html(translations.contact.address);
		$(".contact-div h1.social-media").text(translations.contact.social);

		// Footer
		$("footer p").text(translations.footer.text);

		if (callback)
			callback();
	}

	function languagetippyCreator(tippyMsg, callback) {
		const langBtn = $("#language-switcher");
		const brLang = $("#language-switcher > .br-lang");
		const usaLang = $("#language-switcher > .usa-lang");

		if (langBtn[0]._tippy)
			langBtn[0]._tippy.destroy();

		theTippy = tippy(langBtn[0], {
			content: tippyMsg,
			arrow: true,
			placement: "bottom",
			theme: "transparent",
			"show-on-click": false,
			"show-on-hover": true,
			"show-on-focus": false,
			"hide-on-leave": false,
		});

		langBtn.off("click");
		langBtn.on("click", function (ev) {
			$("#mainContent").addClass("load");
			var language = localStorage.getItem("language");

			var languageToSet = "";
			var langCodeToSet = "";

			if (language === "pt-") {
				languageToSet = "english";
				langCodeToSet = "en-";

				usaLang.addClass("hidden");
				brLang.removeClass("hidden");
			}
			else if (language === "en-") {
				languageToSet = "portuguese";
				langCodeToSet = "pt-";

				brLang.addClass("hidden");
				usaLang.removeClass("hidden");
			}

			changeLanguage(languageToSet, langCodeToSet, function (_tippyMsg) {
				theTippy.setContent(_tippyMsg);
				$("#mainContent").removeClass("load");
			});
		});

		if (callback)
			callback();
	}

	function projectSectionsEvent(callback) {
		$("#btnUaiFuelDep").off("click");
		$("#btnUaiFuelDep").on("click", function (ev) {
			window.open("https://www.youtube.com/watch?v=ooxM2USZKNA", "_blank", "noopener, noreferrer");
		});

		$("#btnUaiFuelRep").off("click");
		$("#btnUaiFuelRep").on("click", function (ev) {
			window.open("https://github.com/earmarques/UaiFuel", "_blank", "noopener, noreferrer");
		});

		if (callback)
			callback();
	}

	function scrollToSection(ev) {
		ev.preventDefault();

		const href = $(ev.target).attr("href");

		const target = $(href);
		const position = Math.ceil(target.offset().top - 70);

		originalOnScroll = window.onscroll;
		window.onscroll = null;

		window.scrollTo({
			top: position,
			behavior: "smooth"
		});
	}

	initPage();
});