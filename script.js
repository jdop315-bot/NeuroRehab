// ========================================
// NEUROREHAB
// Funciones principales del sitio
// ========================================
/* ==========================================
   BUSCADOR DE INSTRUMENTOS
   ========================================== */

const instrumentSearch =
    document.getElementById("instrumentSearch");

const domainFilter =
    document.getElementById("domainFilter");

const instrumentResults =
    document.getElementById("instrumentResults");

const noResults =
    document.getElementById("noResults");


function filterInstruments() {

    const searchText =
        instrumentSearch.value
            .toLowerCase()
            .trim();

    const selectedDomain =
        domainFilter.value;

    const instruments =
        document.querySelectorAll(".search-result");

    let visibleResults = 0;


    instruments.forEach(function (instrument) {

        const searchableText =
            instrument
                .getAttribute("data-search")
                .toLowerCase();

        const instrumentDomain =
            instrument
                .getAttribute("data-domain");


        const matchesSearch =
            searchableText.includes(searchText);


        const matchesDomain =
            selectedDomain === "all" ||
            instrumentDomain === selectedDomain;


        if (
            matchesSearch &&
            matchesDomain
        ) {

            instrument.style.display = "block";

            visibleResults++;

        } else {

            instrument.style.display = "none";

        }

    });


    if (visibleResults === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


if (instrumentSearch && domainFilter) {

    instrumentSearch.addEventListener(
        "input",
        filterInstruments
    );


    domainFilter.addEventListener(
        "change",
        filterInstruments
    );

}
/* ==========================================
   MENÚ MÓVIL
   ========================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    const mobileNavigation = window.matchMedia("(max-width: 700px)");
    const dropdowns = navMenu.querySelectorAll(".dropdown");

    function closeDropdowns() {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("active");

            const trigger = dropdown.querySelector(":scope > a");

            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
            }

        });

    }

    function closeMenu() {

        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        closeDropdowns();

    }

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        if (!isOpen) {
            closeDropdowns();
        }

    });

    dropdowns.forEach(function (dropdown) {

        const trigger = dropdown.querySelector(":scope > a");

        if (!trigger) {
            return;
        }

        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");

        trigger.addEventListener("click", function (event) {

            if (!mobileNavigation.matches) {
                return;
            }

            if (!dropdown.classList.contains("active")) {

                event.preventDefault();
                closeDropdowns();
                dropdown.classList.add("active");
                trigger.setAttribute("aria-expanded", "true");

            }

        });

    });

    navMenu.addEventListener("click", function (event) {

        if (
            mobileNavigation.matches &&
            event.target.closest("a") &&
            !event.target.closest(".dropdown > a")
        ) {
            closeMenu();
        }

    });

    document.addEventListener("click", function (event) {

        if (
            mobileNavigation.matches &&
            !event.target.closest(".navbar")
        ) {
            closeMenu();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    mobileNavigation.addEventListener("change", function () {

        if (!mobileNavigation.matches) {
            closeMenu();
        }

    });

}


/* ==========================================
CALCULADORA 10 METER WALK TEST
========================================== */

const tenMwtCalculator =
    document.getElementById("tenMwtCalculator");

if (tenMwtCalculator) {

    const tenMwtMode =
        document.getElementById("tenMwtMode");

    const tenMwtAid =
        document.getElementById("tenMwtAid");

    const tenMwtHelp =
        document.getElementById("tenMwtHelp");

    const tenMwtAttempt1 =
        document.getElementById("tenMwtAttempt1");

    const tenMwtAttempt2 =
        document.getElementById("tenMwtAttempt2");

    const tenMwtBaseline =
        document.getElementById("tenMwtBaseline");

    const tenMwtOtherAidContainer =
        document.getElementById("tenMwtOtherAidContainer");

    const tenMwtOtherAid =
        document.getElementById("tenMwtOtherAid");

    const tenMwtValidation =
        document.getElementById("tenMwtValidation");

    const tenMwtResults =
        document.getElementById("tenMwtResults");

    const tenMwtChangeRow =
        document.getElementById("tenMwtChangeRow");

    const tenMwtChangeDescription =
        document.getElementById("tenMwtChangeDescription");

    const tenMwtInterpretationBox =
        document.getElementById("tenMwtInterpretationBox");

    const tenMwtInterpretationLabel =
        document.getElementById("tenMwtInterpretationLabel");

    const tenMwtInterpretationDescription =
        document.getElementById("tenMwtInterpretationDescription");

    const tenMwtMcidNote =
        document.getElementById("tenMwtMcidNote");


    /* ==========================================
    AYUDA TÉCNICA — OPCIÓN "OTRA"
    ========================================== */

    function updateTenMwtOtherAid() {

        const isOtherAid =
            tenMwtAid.value === "otra";

        tenMwtOtherAidContainer.hidden =
            !isOtherAid;

        if (!isOtherAid) {
            tenMwtOtherAid.value = "";
        }

    }


    tenMwtAid.addEventListener(
        "change",
        updateTenMwtOtherAid
    );

    updateTenMwtOtherAid();


    /* ==========================================
    CONVERSIÓN DE DECIMALES
    ========================================== */

    function parseDecimal(value) {

        const normalizedValue = value
            .trim()
            .replace(",", ".");

        if (!normalizedValue) {
            return null;
        }

        const parsedValue =
            Number(normalizedValue);

        return Number.isFinite(parsedValue)
            ? parsedValue
            : null;

    }


    /* ==========================================
    FORMATO DE RESULTADOS
    ========================================== */

    function formatNumber(value) {

        return new Intl.NumberFormat("es-CO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);

    }


    function setText(id, text) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = text;
        }

    }


    /* ==========================================
    VALIDACIONES
    ========================================== */

    function showValidation(message) {

        tenMwtValidation.textContent =
            message;

        tenMwtValidation.hidden =
            false;

        tenMwtResults.hidden =
            true;

        tenMwtValidation.focus();

    }


    function clearValidation() {

        tenMwtValidation.textContent =
            "";

        tenMwtValidation.hidden =
            true;

    }


    /* ==========================================
    INSTRUCCIÓN SEGÚN MODALIDAD
    ========================================== */

    function updateTenMwtInstruction() {

        if (tenMwtMode.value === "rapida") {

            tenMwtHelp.innerHTML =
                "<strong>Instrucción:</strong> " +
                "Camine tan rápido como pueda de manera segura. " +
                "No corra.";

        } else {

            tenMwtHelp.innerHTML =
                "<strong>Instrucción:</strong> " +
                "Camine a su velocidad habitual y cómoda.";

        }

    }


    tenMwtMode.addEventListener(
        "change",
        updateTenMwtInstruction
    );

    updateTenMwtInstruction();


    /* ==========================================
    INTERPRETACIÓN CLÍNICA — VELOCIDAD DE MARCHA
    (Perry et al., 1995 / Fritz & Lusardi, 2009)
    ========================================== */

    function interpretTenMwtSpeed(speed, mode) {

        const isFast = mode === "rapida";

        if (speed < 0.40) {
            return {
                label: "Deambulación domiciliaria",
                className: "tenmwt-household",
                description:
                    "La velocidad corresponde a un patrón de deambulación " +
                    "restringido al hogar. Suele asociarse con dependencia " +
                    "para desplazamientos comunitarios y mayor riesgo de caídas. " +
                    "Se recomienda priorizar el entrenamiento de la marcha " +
                    "con apoyo, el equilibrio y la prevención de caídas."
            };
        }

        if (speed < 0.60) {
            return {
                label: "Deambulación limitada en comunidad",
                className: "tenmwt-limited",
                description:
                    "La velocidad permite desplazamientos comunitarios " +
                    "limitados. Puede ser útil combinar entrenamiento de la " +
                    "marcha, resistencia y velocidad progresiva, además de " +
                    "valorar el uso de ayudas técnicas."
            };
        }

        if (speed < 0.80) {
            return {
                label: "Deambulación comunitaria modificada",
                className: "tenmwt-modified",
                description:
                    "La velocidad corresponde a una deambulación comunitaria " +
                    "modificada. La persona suele desplazarse en su entorno " +
                    "con ciertas limitaciones. Se recomienda entrenamiento " +
                    "funcional orientado a tareas y progresión de la velocidad."
            };
        }

        if (speed < 1.00) {
            return {
                label: "Deambulación comunitaria completa",
                className: "tenmwt-community",
                description:
                    "La velocidad permite la deambulación comunitaria completa. " +
                    "Es posible mantener y optimizar la función con " +
                    "entrenamiento de la marcha, resistencia y prevención " +
                    "de recaídas."
            };
        }

        if (speed < 1.30) {

            if (isFast) {
                return {
                    label: "Velocidad funcional esperada",
                    className: "tenmwt-normal",
                    description:
                        "La velocidad se encuentra dentro de rangos funcionales " +
                        "esperados para la población adulta. Mantener la actividad " +
                        "física regular y el entrenamiento de fuerza favorece la " +
                        "preservación funcional."
                };
            }

            return {
                label: "Velocidad funcional esperada",
                className: "tenmwt-normal",
                description:
                    "La velocidad se encuentra dentro de rangos funcionales " +
                    "esperados para la población adulta. Mantener la actividad " +
                    "física regular y el entrenamiento de fuerza favorece la " +
                    "preservación funcional."
            };
        }

        return {
            label: "Velocidad suficiente para cruzar la calle con seguridad",
            className: "tenmwt-normal",
            description:
                "La velocidad alcanzada permite desplazamientos comunitarios " +
                "con seguridad, incluyendo cruzar la calle en el tiempo " +
                "habitual de un semáforo. Se recomienda mantener la función " +
                "a través de actividad física regular."
        };
    }


    function updateTenMwtInterpretation(speed, mode) {

        if (!tenMwtInterpretationBox ||
            !tenMwtInterpretationLabel ||
            !tenMwtInterpretationDescription) {
            return;
        }

        const interpretation =
            interpretTenMwtSpeed(speed, mode);

        tenMwtInterpretationLabel.textContent =
            interpretation.label;

        tenMwtInterpretationDescription.textContent =
            interpretation.description;

        tenMwtInterpretationBox.classList.remove(
            "tenmwt-household",
            "tenmwt-limited",
            "tenmwt-modified",
            "tenmwt-community",
            "tenmwt-normal"
        );

        tenMwtInterpretationBox.classList.add(
            interpretation.className
        );

        if (tenMwtMcidNote) {
            tenMwtMcidNote.hidden = false;
        }
    }


    /* ==========================================
    CÁLCULO 10MWT
    ========================================== */

    tenMwtCalculator.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const time1 =
                parseDecimal(tenMwtAttempt1.value);

            const time2 =
                parseDecimal(tenMwtAttempt2.value);

            const baseline =
                parseDecimal(tenMwtBaseline.value);


            /* ==========================================
            INTENTO 1 — OBLIGATORIO
            ========================================== */

            if (time1 === null || time1 <= 0) {

                showValidation(
                    "Ingrese un tiempo válido mayor que cero para el intento 1."
                );

                return;

            }


            /* ==========================================
            INTENTO 2 — OPCIONAL
            ========================================== */

            if (
                tenMwtAttempt2.value.trim() &&
                (time2 === null || time2 <= 0)
            ) {

                showValidation(
                    "El intento 2 debe ser un tiempo válido mayor que cero o dejarse vacío."
                );

                return;

            }


            /* ==========================================
            VELOCIDAD PREVIA — OPCIONAL
            ========================================== */

            if (
                tenMwtBaseline.value.trim() &&
                (baseline === null || baseline <= 0)
            ) {

                showValidation(
                    "La velocidad previa debe ser un valor válido mayor que cero o dejarse vacía."
                );

                return;

            }


            /* ==========================================
            TIEMPOS REGISTRADOS
            ========================================== */

            const times =
                time2 === null
                    ? [time1]
                    : [time1, time2];

            const averageTime =
                times.reduce(function (sum, time) {
                    return sum + time;
                }, 0) / times.length;


            /* ==========================================
            VELOCIDAD — 6 METROS CRONOMETRADOS
            ========================================== */

            const speed1 = 6 / time1;

            const speed2 =
                time2 === null
                    ? null
                    : 6 / time2;

            const averageSpeed = 6 / averageTime;


            /* ==========================================
            DATOS DE REGISTRO
            ========================================== */

            setText(
                "tenMwtResultMode",
                tenMwtMode.options[
                    tenMwtMode.selectedIndex
                ].text
            );

            let aidText =
                tenMwtAid.options[
                    tenMwtAid.selectedIndex
                ].text;

            if (
                tenMwtAid.value === "otra" &&
                tenMwtOtherAid.value.trim()
            ) {

                aidText =
                    "Otra: " +
                    tenMwtOtherAid.value.trim();

            }

            setText("tenMwtResultAid", aidText);

            setText(
                "tenMwtResultAttempt1",
                formatNumber(time1) +
                " s · " +
                formatNumber(speed1) +
                " m/s"
            );

            setText(
                "tenMwtResultAttempt2",
                time2 === null
                    ? "No registrado"
                    : formatNumber(time2) +
                      " s · " +
                      formatNumber(speed2) +
                      " m/s"
            );

            setText(
                "tenMwtResultAverageTime",
                formatNumber(averageTime) + " s"
            );

            setText(
                "tenMwtResultAverageSpeed",
                formatNumber(averageSpeed) + " m/s"
            );

            setText(
                "tenMwtPrimaryResult",
                formatNumber(averageSpeed) + " m/s"
            );

            setText(
                "tenMwtAttemptNote",
                times.length === 1
                    ? "Resultado calculado con un solo intento."
                    : "Resultado calculado a partir de dos intentos."
            );


            /* ==========================================
            CAMBIO ABSOLUTO
            ========================================== */

            if (baseline === null) {

                tenMwtChangeRow.hidden = true;

                tenMwtChangeDescription.textContent = "";

            } else {

                const absoluteChange =
                    averageSpeed - baseline;

                const roundedChange =
                    Number(absoluteChange.toFixed(2));

                const changePrefix =
                    absoluteChange > 0 ? "+" : "";

                let changeDescription = "";

                if (roundedChange > 0) {

                    changeDescription =
                        "La velocidad actual es mayor que la registrada previamente.";

                } else if (roundedChange < 0) {

                    changeDescription =
                        "La velocidad actual es menor que la registrada previamente.";

                } else {

                    changeDescription =
                        "La velocidad actual es igual a la registrada previamente.";

                }

                setText(
                    "tenMwtResultChange",
                    changePrefix +
                    formatNumber(absoluteChange) +
                    " m/s"
                );

                tenMwtChangeDescription.textContent =
                    changeDescription;

                tenMwtChangeRow.hidden = false;

            }


            /* ==========================================
            INTERPRETACIÓN CLÍNICA
            ========================================== */

            updateTenMwtInterpretation(
                averageSpeed,
                tenMwtMode.value
            );


            /* ==========================================
            MOSTRAR RESULTADOS
            ========================================== */

            clearValidation();

            tenMwtResults.hidden = false;

        }
    );

}
/* ==========================================
   ÍNDICE DE BARTHEL
   CÁLCULO, VALIDACIÓN E INTERPRETACIÓN
   ========================================== */

const barthelCalculator =
    document.getElementById("barthelCalculator");

if (barthelCalculator) {

    /* ------------------------------------------
       REFERENCIAS AL DOM
       ------------------------------------------ */

    const barthelValidation =
        document.getElementById("barthelValidation");

    const barthelResults =
        document.getElementById("barthelResults");

    const barthelTotalScore =
        document.getElementById("barthelTotalScore");

    const barthelInterpretationLabel =
        document.getElementById("barthelInterpretationLabel");

    const barthelPrimaryResult =
        document.getElementById("barthelPrimaryResult");

    const barthelInterpretationBox =
        document.getElementById("barthelInterpretationBox");

    const barthelInterpretationDescription =
        document.getElementById("barthelInterpretationDescription");
    const barthelMcidDisplay =
    document.getElementById("barthelMcidNote");


    /* ------------------------------------------
       NOMBRES DE LOS 10 ÍTEMS
       (deben coincidir con los name del HTML)
       ------------------------------------------ */

    const barthelItemNames = [
        "barthel-alimentacion",
        "barthel-bano",
        "barthel-aseo",
        "barthel-vestido",
        "barthel-deposicion",
        "barthel-miccion",
        "barthel-retrete",
        "barthel-traslado",
        "barthel-deambulacion",
        "barthel-escaleras"
    ];


    /* ------------------------------------------
       RESALTAR OPCIÓN SELECCIONADA
       ------------------------------------------ */

    barthelCalculator.addEventListener(
        "change",
        function (event) {

            if (
                !event.target.matches(
                    'input[type="radio"][name^="barthel-"]'
                )
            ) {
                return;
            }

            const selectedOption =
                event.target.closest(".barthel-option");

            const item =
                event.target.closest(".barthel-item");

            if (!item) {
                return;
            }

            item
                .querySelectorAll(".barthel-option")
                .forEach(function (option) {
                    option.classList.remove("selected");
                });

            if (selectedOption) {
                selectedOption.classList.add("selected");
            }

        }
    );


    /* ------------------------------------------
       INTERPRETACIÓN POR RANGOS
       ------------------------------------------ */

    function interpretBarthelScore(score) {

        if (score <= 20) {
            return {
                label: "Dependencia total",
                className: "barthel-total",
                description:
                    "El puntaje refleja una dependencia total para las actividades básicas de la vida diaria evaluadas."
            };
        }

        if (score <= 60) {
            return {
                label: "Dependencia severa",
                className: "barthel-severe",
                description:
                    "El puntaje refleja una dependencia severa para las actividades básicas de la vida diaria evaluadas."
            };
        }

        if (score <= 90) {
            return {
                label: "Dependencia moderada",
                className: "barthel-moderate",
                description:
                    "El puntaje refleja una dependencia moderada para las actividades básicas de la vida diaria evaluadas."
            };
        }

        if (score <= 99) {
            return {
                label: "Dependencia leve",
                className: "barthel-mild",
                description:
                    "El puntaje refleja una dependencia leve para las actividades básicas de la vida diaria evaluadas."
            };
        }

        return {
            label: "Independencia",
            className: "barthel-independent",
            description:
                "El puntaje corresponde a independencia en las actividades básicas de la vida diaria evaluadas."
        };

    }


    /* ------------------------------------------
       VALIDACIÓN Y CÁLCULO
       ------------------------------------------ */

    barthelCalculator.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ----- VALIDAR ÍTEMS SIN RESPONDER ----- */

            const unansweredItems = [];

            barthelItemNames.forEach(function (name) {

                const selected =
                    barthelCalculator.querySelector(
                        `input[name="${name}"]:checked`
                    );

                if (!selected) {
                    unansweredItems.push(name);
                }

            });


            if (unansweredItems.length > 0) {

                barthelValidation.textContent =
                    "Debe responder todas las actividades antes de calcular el resultado.";

                barthelValidation.hidden =
                    false;

                barthelResults.hidden =
                    true;

                                    if (barthelMcidDisplay) {
                    barthelMcidDisplay.hidden = true;
                }

                barthelValidation.focus();

                return;

            }


            /* ----- LIMPIAR VALIDACIÓN ----- */

            barthelValidation.textContent =
                "";

            barthelValidation.hidden =
                true;


            /* ----- CALCULAR PUNTAJE TOTAL ----- */

            let barthelTotal = 0;

            barthelItemNames.forEach(function (name) {

                const selected =
                    barthelCalculator.querySelector(
                        `input[name="${name}"]:checked`
                    );

                if (selected) {
                    barthelTotal += Number(selected.value);
                }

            });


            /* ----- INTERPRETACIÓN ----- */

            const interpretation =
                interpretBarthelScore(barthelTotal);


            /* ----- MOSTRAR RESULTADO ----- */

            barthelTotalScore.textContent =
                `${barthelTotal} / 100`;

            barthelInterpretationLabel.textContent =
                interpretation.label;

            barthelPrimaryResult.textContent =
                `${barthelTotal} / 100`;

            barthelInterpretationDescription.textContent =
                interpretation.description;


            /* ----- APLICAR CLASE DE COLOR ----- */

            barthelInterpretationBox.classList.remove(
                "barthel-total",
                "barthel-severe",
                "barthel-moderate",
                "barthel-mild",
                "barthel-independent"
            );

            barthelInterpretationBox.classList.add(
                interpretation.className
            );

                        /* ----- MOSTRAR MCID ----- */

            if (barthelMcidDisplay) {
                barthelMcidDisplay.hidden = false;
            }

            /* ----- MOSTRAR PANEL DE RESULTADOS ----- */

            barthelResults.hidden =
                false;

        }
    );

}

/* ============================================
   MODIFIED ASHWORTH SCALE
   HERRAMIENTA INTERACTIVA
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

    const ashworthEvaluator = document.getElementById("ashworth-evaluator");

    if (!ashworthEvaluator) {
        return;
    }


    /* --------------------------------------------
       ELEMENTOS
       -------------------------------------------- */

    const sideSelect = document.getElementById("ashworthSide");
    const muscleSelect = document.getElementById("ashworthMuscle");
    const observationInput = document.getElementById("ashworthObservation");

    const scoreButtons = document.querySelectorAll(".ashworth-score-btn");

    const scoreDescription =
        document.getElementById("ashworthScoreDescription");

    const addButton =
        document.getElementById("addAshworthRecord");

    const clearButton =
        document.getElementById("clearAshworthForm");

    const tableBody =
        document.getElementById("ashworthTableBody");

    const tableWrapper =
        document.getElementById("ashworthTableWrapper");

    const emptyState =
        document.getElementById("ashworthEmpty");

    const countElement =
        document.getElementById("ashworthCount");

    const summary =
        document.getElementById("ashworthSummary");

    const summaryTotal =
        document.getElementById("summaryTotal");

    const summaryMode =
        document.getElementById("summaryMode");

    const summaryZero =
        document.getElementById("summaryZero");

    const summaryHigh =
        document.getElementById("summaryHigh");

    const clinicalInterpretation =
        document.getElementById("ashworthClinicalInterpretation");


    /* --------------------------------------------
       DATOS DE LA ESCALA
       -------------------------------------------- */

    const ashworthDescriptions = {

        "0":
            "No se observa aumento del tono muscular.",

        "1":
            "Ligero aumento del tono manifestado por una resistencia mínima al final del arco de movimiento cuando la parte afectada se mueve en flexión o extensión.",

        "1+":
            "Ligero aumento del tono manifestado por una resistencia mínima durante menos de la mitad del arco de movimiento.",

        "2":
            "Aumento más marcado del tono durante la mayor parte del arco de movimiento, pero la parte afectada se mueve fácilmente.",

        "3":
            "Aumento considerable del tono que dificulta el movimiento pasivo.",

        "4":
            "La parte afectada se encuentra rígida en flexión o extensión."

    };


    /* --------------------------------------------
       ESTADO
       -------------------------------------------- */

    let selectedScore = null;

    let ashworthRecords = [];


    /* --------------------------------------------
       SELECCIÓN DE PUNTUACIÓN
       -------------------------------------------- */

    scoreButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            scoreButtons.forEach(function (item) {

                item.classList.remove("selected");

            });


            button.classList.add("selected");

            selectedScore =
                button.getAttribute("data-score");


            scoreDescription.innerHTML = `
                <strong>MAS ${selectedScore}</strong>
                <span>
                    ${ashworthDescriptions[selectedScore]}
                </span>
            `;

        });

    });


    /* --------------------------------------------
       AGREGAR REGISTRO
       -------------------------------------------- */

    addButton.addEventListener("click", function () {

        const side = sideSelect.value;

        const muscle = muscleSelect.value;

        const observation =
            observationInput.value.trim();


        /* VALIDACIÓN */

        if (!side) {

            showAshworthMessage(
                "Selecciona el lado corporal.",
                "error"
            );

            sideSelect.focus();

            return;
        }


        if (!muscle) {

            showAshworthMessage(
                "Selecciona el grupo muscular o movimiento.",
                "error"
            );

            muscleSelect.focus();

            return;
        }


        if (!selectedScore) {

            showAshworthMessage(
                "Selecciona una puntuación de la MAS.",
                "error"
            );

            return;
        }


        /* CREAR REGISTRO */

        const record = {

            id: Date.now(),

            side: side,

            muscle: muscle,

            score: selectedScore,

            observation:
                observation || "—"

        };


        ashworthRecords.push(record);


        renderAshworthRecords();

        updateAshworthSummary();

        clearAshworthForm();


        showAshworthMessage(
            "Evaluación agregada correctamente.",
            "success"
        );

    });


    /* --------------------------------------------
       LIMPIAR FORMULARIO
       -------------------------------------------- */

    clearButton.addEventListener("click", function () {

        clearAshworthForm();

    });


    function clearAshworthForm() {

        sideSelect.value = "";

        muscleSelect.value = "";

        observationInput.value = "";

        selectedScore = null;


        scoreButtons.forEach(function (button) {

            button.classList.remove("selected");

        });


        scoreDescription.innerHTML = `
            <span class="description-placeholder">
                Selecciona una puntuación para visualizar
                su descripción clínica.
            </span>
        `;

    }


    /* --------------------------------------------
       MOSTRAR REGISTROS
       -------------------------------------------- */

    function renderAshworthRecords() {

        tableBody.innerHTML = "";


        if (ashworthRecords.length === 0) {

            tableWrapper.hidden = true;

            emptyState.hidden = false;

            countElement.textContent = "0 registros";

            return;

        }


        tableWrapper.hidden = false;

        emptyState.hidden = true;


        countElement.textContent =
            ashworthRecords.length === 1
                ? "1 registro"
                : `${ashworthRecords.length} registros`;


        ashworthRecords.forEach(function (record) {

            const row = document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${record.side}
                </td>

                <td>
                    <strong>
                        ${record.muscle}
                    </strong>
                </td>

                <td>
                    <span class="ashworth-score-badge score-${record.score.replace("+", "plus")}">
                        ${record.score}
                    </span>
                </td>

                <td>
                    ${ashworthDescriptions[record.score]}
                </td>

                <td>
                    ${escapeAshworthHTML(record.observation)}
                </td>

                <td>

                    <button
                        type="button"
                        class="ashworth-delete-btn"
                        data-id="${record.id}"
                        aria-label="Eliminar evaluación"
                    >
                        Eliminar
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        /* BOTONES ELIMINAR */

        const deleteButtons =
            document.querySelectorAll(".ashworth-delete-btn");


        deleteButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const id =
                    Number(button.getAttribute("data-id"));


                ashworthRecords =
                    ashworthRecords.filter(function (record) {

                        return record.id !== id;

                    });


                renderAshworthRecords();

                updateAshworthSummary();

            });

        });

    }


    /* --------------------------------------------
       RESUMEN CLÍNICO
       -------------------------------------------- */

    function updateAshworthSummary() {

        if (ashworthRecords.length === 0) {

            summary.hidden = true;

            return;

        }


        summary.hidden = false;


        summaryTotal.textContent =
            ashworthRecords.length;


        /* PUNTUACIONES NUMÉRICAS */

        const numericScores =
            ashworthRecords.map(function (record) {

                return record.score === "1+"
                    ? 1.5
                    : Number(record.score);

            });


        /* MODA */

        const frequency = {};

        ashworthRecords.forEach(function (record) {

            frequency[record.score] =
                (frequency[record.score] || 0) + 1;

        });


        let mode = null;

        let maxFrequency = 0;


        Object.keys(frequency).forEach(function (score) {

            if (frequency[score] > maxFrequency) {

                maxFrequency =
                    frequency[score];

                mode = score;

            }

        });


        summaryMode.textContent =
            mode || "—";


        /* PUNTUACIÓN 0 */

        const zeroCount =
            ashworthRecords.filter(function (record) {

                return record.score === "0";

            }).length;


        summaryZero.textContent =
            zeroCount;


        /* PUNTUACIONES >= 2 */

        const highCount =
            numericScores.filter(function (score) {

                return score >= 2;

            }).length;


        summaryHigh.textContent =
            highCount;


        /* INTERPRETACIÓN */

        const total =
            ashworthRecords.length;


        const percentageHigh =
            Math.round(
                (highCount / total) * 100
            );


        if (highCount === 0) {

            clinicalInterpretation.textContent =
                "Las evaluaciones registradas no muestran puntuaciones de 2 o superiores. El perfil debe interpretarse junto con el rango de movimiento, la función y otras características del examen motor.";

        } else if (percentageHigh < 50) {

            clinicalInterpretation.textContent =
                `Se registraron ${highCount} de ${total} evaluaciones con puntuaciones de 2 o superiores (${percentageHigh}%). Esto indica mayor resistencia al movimiento pasivo en algunos de los segmentos evaluados.`;

        } else {

            clinicalInterpretation.textContent =
                `Se registraron ${highCount} de ${total} evaluaciones con puntuaciones de 2 o superiores (${percentageHigh}%). El perfil muestra una presencia importante de resistencia aumentada al movimiento pasivo en los segmentos registrados.`;

        }

    }


    /* --------------------------------------------
       MENSAJES
       -------------------------------------------- */

    function showAshworthMessage(message, type) {

        const existing =
            document.querySelector(".ashworth-message");

        if (existing) {
            existing.remove();
        }


        const messageElement =
            document.createElement("div");


        messageElement.className =
            `ashworth-message ${type}`;


        messageElement.textContent =
            message;


        addButton.parentNode.insertBefore(
            messageElement,
            addButton
        );


        setTimeout(function () {

            messageElement.remove();

        }, 3000);

    }


    /* --------------------------------------------
       SEGURIDAD PARA OBSERVACIONES
       -------------------------------------------- */

    function escapeAshworthHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


});

/* ==========================================
   MODIFIED ASHWORTH SCALE
   EVALUADOR INTERACTIVO
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

        const masSegment = document.getElementById("masSegment");

        if (!masSegment) {
        return;
    }

    const masSide = document.getElementById("masSide");
    const masScore = document.getElementById("masScore");

    const masScoreNumber = document.getElementById("masScoreNumber");
    const masScoreTitle = document.getElementById("masScoreTitle");
    const masScoreText = document.getElementById("masScoreText");

    const masObservations =
        document.getElementById("masObservations");

    const masGenerate =
        document.getElementById("masGenerate");

    const masClear =
        document.getElementById("masClear");

    const masResult =
    document.getElementById("masResults");

    const masResultScore =
        document.getElementById("masResultScore");

    const masResultSegment =
        document.getElementById("masResultSegment");

    const masResultSide =
        document.getElementById("masResultSide");

    const masResultValue =
        document.getElementById("masResultValue");

    const masResultInterpretation =
        document.getElementById("masResultInterpretation");

    const masResultObservations =
        document.getElementById("masResultObservations");


    const masDescriptions = {

        "0": {
            title: "Sin aumento del tono",
            text:
                "No se observa aumento del tono muscular durante el movimiento pasivo."
        },

        "1": {
            title: "Ligero aumento del tono",
            text:
                "Ligero aumento del tono manifestado por una resistencia mínima al final del arco de movimiento."
        },

        "1+": {
            title: "Ligero aumento del tono con resistencia mínima",
            text:
                "Ligero aumento del tono manifestado por una resistencia mínima durante menos de la mitad del arco de movimiento."
        },

        "2": {
            title: "Aumento más marcado del tono",
            text:
                "Aumento más marcado del tono durante la mayor parte del arco de movimiento, pero el segmento puede movilizarse fácilmente."
        },

        "3": {
            title: "Aumento considerable del tono",
            text:
                "Aumento considerable del tono que dificulta el movimiento pasivo."
        },

        "4": {
            title: "Segmento rígido",
            text:
                "La parte afectada se encuentra rígida en flexión o extensión."
        }

    };


    /* ------------------------------------------
       ACTUALIZAR DESCRIPCIÓN
       ------------------------------------------ */

    function updateMASDescription() {

        const score = masScore.value;

        if (!score) {

            masScoreNumber.textContent = "—";

            masScoreTitle.textContent =
                "Selecciona una puntuación";

            masScoreText.textContent =
                "La descripción clínica aparecerá aquí.";

            return;
        }


        const description =
            masDescriptions[score];

        masScoreNumber.textContent = score;

        masScoreTitle.textContent =
            description.title;

        masScoreText.textContent =
            description.text;

    }


    /* ------------------------------------------
       GENERAR REGISTRO
       ------------------------------------------ */

    function generateMASRecord() {

        const segment = masSegment.value;
        const side = masSide.value;
        const score = masScore.value;

        const observations =
            masObservations.value.trim();


        if (!segment || !side || !score) {

            alert(
                "Para generar el registro debes seleccionar el segmento corporal, el lado y la puntuación MAS."
            );

            return;
        }


        const description =
            masDescriptions[score];


        masResultScore.textContent =
            "MAS " + score;

        masResultSegment.textContent =
            segment;

        masResultSide.textContent =
            side;

        masResultValue.textContent =
            score;

        masResultInterpretation.textContent =
            description.text;

        masResultObservations.textContent =
            observations ||
            "Sin observaciones registradas.";


        masResult.hidden = false;


        masResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    /* ------------------------------------------
       LIMPIAR EVALUACIÓN
       ------------------------------------------ */

    function clearMASRecord() {

        masSegment.value = "";
        masSide.value = "";
        masScore.value = "";

        masObservations.value = "";

        masResult.hidden = true;

        updateMASDescription();

    }


    /* ------------------------------------------
       EVENTOS
       ------------------------------------------ */

    masScore.addEventListener(
        "change",
        updateMASDescription
    );

    masGenerate.addEventListener(
        "click",
        generateMASRecord
    );

    masClear.addEventListener(
        "click",
        clearMASRecord
    );


    /* ------------------------------------------
       ESTADO INICIAL
       ------------------------------------------ */

    updateMASDescription();

});

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       EVALUADOR BBS INTERACTIVO
       ===================================================== */

    const bbsItems =
        document.getElementById("bbsItems");


    /*
     * Si esta sección no existe en la página,
     * simplemente no se ejecuta.
     */

    if (bbsItems) {

        const bbsScores = {};

        /* Mantener la presentación visual en el orden oficial
           aunque los bloques se hubieran añadido en otro orden. */
        Array.from(
            bbsItems.querySelectorAll(".bbs-item")
        )
            .sort(function (firstItem, secondItem) {

                const firstId = Number(
                    firstItem.querySelector("button").dataset.item
                );

                const secondId = Number(
                    secondItem.querySelector("button").dataset.item
                );

                return firstId - secondId;

            })
            .forEach(function (item) {

                bbsItems.appendChild(item);

            });


        const scoreButtons =
            bbsItems.querySelectorAll(
                ".bbs-score-options button"
            );


        const totalElement =
            document.getElementById("bbsTotal");


        const progressElement =
            document.getElementById("bbsProgress");


        const progressText =
            document.getElementById("bbsProgressText");


        const progressPercent =
            document.getElementById("bbsProgressPercent");


        const interpretationElement =
            document.getElementById("bbsInterpretation");


        const recommendationElement =
            document.getElementById("bbsRecommendation");

            const mcidElement =
    document.getElementById("bergMcidNote");

        const resetButton =
            document.getElementById("bbsReset");


        const totalItems = 14;
        const maximumScore = 56;


        /* =================================================
           ACTUALIZAR EVALUADOR BBS
           ================================================= */

        function updateBBS() {

            const itemCount =
                Object.keys(bbsScores).length;


            let total = 0;


            Object.values(bbsScores).forEach(
                function (score) {

                    total += score;

                }
            );


            /* ---------------------------------------------
               CALCULAR PORCENTAJE
               --------------------------------------------- */

            const percentage =
                Math.round(
                    (itemCount / totalItems) * 100
                );


            /* ---------------------------------------------
               ACTUALIZAR TOTAL
               --------------------------------------------- */

            if (totalElement) {

                totalElement.textContent =
                    total;

            }


            /* ---------------------------------------------
               ACTUALIZAR BARRA
               --------------------------------------------- */

            if (progressElement) {

                progressElement.style.width =
                    percentage + "%";

                progressElement.setAttribute(
                    "aria-valuenow",
                    String(itemCount)
                );

            }


            /* ---------------------------------------------
               ACTUALIZAR TEXTO DE PROGRESO
               --------------------------------------------- */

            if (progressText) {

                progressText.textContent =
                    `${itemCount} de ${totalItems} tareas calificadas`;

            }


            if (progressPercent) {

                progressPercent.textContent =
                    percentage + "%";

            }


            /* ---------------------------------------------
               EVALUACIÓN INCOMPLETA
               --------------------------------------------- */

            if (itemCount < totalItems) {

                if (interpretationElement) {

                    interpretationElement.textContent =
                        "Complete las 14 tareas para obtener la interpretación.";

                }


                if (recommendationElement) {

                    recommendationElement.textContent =
                        `Puntuación provisional: ${total}/${maximumScore}. Complete todos los ítems antes de interpretar el resultado.`;

                }

    if (mcidElement) {
        mcidElement.hidden = true;
    }
                return;

            }


            /* =================================================
               INTERPRETACIÓN FINAL
               ================================================= */

            if (total <= 20) {

                if (interpretationElement) {

                    interpretationElement.textContent =
                        "Desempeño de equilibrio considerablemente limitado.";

                }


                if (recommendationElement) {

                    recommendationElement.textContent =
                        "El resultado sugiere una importante limitación funcional del equilibrio. Debe analizarse junto con movilidad, marcha, asistencia requerida y contexto clínico.";

                }

            }


            else if (total <= 40) {

                if (interpretationElement) {

                    interpretationElement.textContent =
                        "Desempeño de equilibrio con limitaciones funcionales.";

                }


                if (recommendationElement) {

                    recommendationElement.textContent =
                        "El resultado corresponde a un nivel intermedio de desempeño. La interpretación debe considerar la población evaluada y las demandas funcionales de la persona.";

                }

            }


            else {

                if (interpretationElement) {

                    interpretationElement.textContent =
                        "Mayor desempeño en las tareas de equilibrio evaluadas.";

                }


                if (recommendationElement) {

                    recommendationElement.textContent =
                        "Una puntuación elevada indica mejor desempeño en las tareas de la escala, pero no permite descartar por sí sola el riesgo de caídas.";

                }

            }
        /* ---------------------------------------------
           MOSTRAR MCID CUANDO LA EVALUACIÓN ESTÁ COMPLETA
           --------------------------------------------- */

        if (mcidElement) {
            mcidElement.hidden = false;
        }

        }


        /* =================================================
           BOTONES DE PUNTUACIÓN
           ================================================= */

        scoreButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const item =
                            this.dataset.item;


                        const score =
                            Number(
                                this.dataset.score
                            );


                        /*
                         * Buscar el grupo de opciones
                         * correspondiente al ítem.
                         */

                        const parent =
                            this.closest(
                                ".bbs-score-options"
                            );


                        /*
                         * Quitar selección anterior
                         * solamente de este ítem.
                         */

                        if (parent) {

                            parent
                                .querySelectorAll("button")
                                .forEach(
                                    function (btn) {

                                        btn.classList.remove(
                                            "selected"
                                        );

                                        btn.setAttribute(
                                            "aria-pressed",
                                            "false"
                                        );

                                    }
                                );

                        }


                        /*
                         * Marcar la opción seleccionada.
                         */

                        this.classList.add(
                            "selected"
                        );

                        this.setAttribute(
                            "aria-pressed",
                            "true"
                        );


                        /*
                         * Guardar puntuación.
                         */

                        if (item) {

                            bbsScores[item] =
                                score;

                        }


                        /*
                         * Actualizar resultados.
                         */

                        updateBBS();

                    }
                );

            }
        );


        /* =================================================
           BOTÓN RESTABLECER BBS
           ================================================= */

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {


                    /*
                     * Vaciar puntuaciones.
                     */

                    Object.keys(
                        bbsScores
                    ).forEach(
                        function (key) {

                            delete bbsScores[key];

                        }
                    );


                    /*
                     * Quitar selección visual.
                     */

                    scoreButtons.forEach(
                        function (button) {

                            button.classList.remove(
                                "selected"
                            );

                            button.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }
                    );


                    /*
                     * Actualizar interfaz.
                     */

                    updateBBS();


                    /*
                     * Volver al inicio del evaluador.
                     */

                    const evaluator =
                        document.getElementById(
                            "evaluador-bbs"
                        );


                    if (evaluator) {

                        evaluator.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }


        /* =================================================
           ESTADO INICIAL BBS
           ================================================= */

        updateBBS();

    }

});
/* ==========================================================
   CALCULADORA TIMED UP AND GO (TUG)
   ========================================================== */
 
const tugCalculator =
    document.getElementById("tugCalculator");
 
if (tugCalculator) {
 
    const tugAid =
        document.getElementById("tugAid");
 
    const tugOtherAidContainer =
        document.getElementById("tugOtherAidContainer");
 
    const tugOtherAid =
        document.getElementById("tugOtherAid");
 
    const tugAttempt1 =
        document.getElementById("tugAttempt1");
 
    const tugAttempt2 =
        document.getElementById("tugAttempt2");
 
    const tugBaseline =
        document.getElementById("tugBaseline");
 
    const tugValidation =
        document.getElementById("tugValidation");
 
    const tugResults =
        document.getElementById("tugResults");
 
    const tugChangeRow =
        document.getElementById("tugChangeRow");
 
    const tugChangeDescription =
        document.getElementById("tugChangeDescription");
 
    const tugInterpretationBox =
        document.getElementById("tugInterpretationBox");
 
    const tugInterpretationLabel =
        document.getElementById("tugInterpretationLabel");
 
    const tugInterpretationDescription =
        document.getElementById("tugInterpretationDescription");

    const tugMcidNote =
    document.getElementById("tugMcidNote");
 
     /* ==========================================
    AYUDA TÉCNICA — OPCIÓN "OTRA"
    ========================================== */
 
    function updateTugOtherAid() {
 
        const isOtherAid =
            tugAid.value === "otra";
 
        tugOtherAidContainer.hidden =
            !isOtherAid;
 
        if (!isOtherAid) {
            tugOtherAid.value = "";
        }
 
    }
 
    tugAid.addEventListener(
        "change",
        updateTugOtherAid
    );
 
    updateTugOtherAid();
 
 
    /* ==========================================
    CONVERSIÓN DE DECIMALES
    ========================================== */
 
    function parseTugDecimal(value) {
 
        const normalizedValue = value
            .trim()
            .replace(",", ".");
 
        if (!normalizedValue) {
            return null;
        }
 
        const parsedValue =
            Number(normalizedValue);
 
        return Number.isFinite(parsedValue)
            ? parsedValue
            : null;
 
    }
 
 
    /* ==========================================
    FORMATO DE RESULTADOS
    ========================================== */
 
    function formatTugNumber(value) {
 
        return new Intl.NumberFormat("es-CO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
 
    }
 
 
    function setTugText(id, text) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = text;
    }

}
 
 
    /* ==========================================
    VALIDACIONES
    ========================================== */
 
    function showTugValidation(message) {
 
        tugValidation.textContent =
            message;
 
        tugValidation.hidden =
            false;
 
        tugResults.hidden =
            true;
     if (tugMcidNote) {
        tugMcidNote.hidden = true;
    }
        tugValidation.focus();
 
    }
 
 
    function clearTugValidation() {
 
        tugValidation.textContent =
            "";
 
        tugValidation.hidden =
            true;
 
    }
 
 
    /* ==========================================
    INTERPRETACIÓN CLÍNICA POR BANDAS
    (Podsiadlo & Richardson, categorías clásicas)
    ========================================== */
 
    function interpretTugTime(time) {
 
        if (time < 10) {
 
            return {
                label: "Movilidad funcional normal",
                className: "tug-independent",
                description:
                    "Un tiempo inferior a 10 segundos suele " +
                    "asociarse con movilidad funcional conservada " +
                    "y bajo requerimiento de asistencia para " +
                    "tareas básicas de desplazamiento."
            };
 
        }
 
        if (time < 20) {
 
            return {
                label: "Movilidad funcional mayormente conservada",
                className: "tug-mild",
                description:
                    "Un tiempo entre 10 y 20 segundos suele " +
                    "asociarse con desempeño funcional mayormente " +
                    "independiente, aunque pueden observarse " +
                    "limitaciones leves que ameritan valoración " +
                    "adicional."
            };
 
        }
 
        if (time < 30) {
 
            return {
                label: "Movilidad funcional variable",
                className: "tug-variable",
                description:
                    "Un tiempo entre 20 y 30 segundos suele " +
                    "asociarse con mayor variabilidad en el " +
                    "desempeño funcional y puede relacionarse " +
                    "con un riesgo aumentado de caídas, " +
                    "dependiendo del contexto clínico."
            };
 
        }
 
        return {
            label: "Movilidad funcional comprometida",
            className: "tug-impaired",
            description:
                "Un tiempo igual o superior a 30 segundos suele " +
                "asociarse con mayor dependencia funcional para " +
                "actividades de la vida diaria y amerita una " +
                "valoración clínica más detallada."
        };
 
    }
 
 
    /* ==========================================
    CÁLCULO TUG
    ========================================== */
 
    tugCalculator.addEventListener(
        "submit",
        function (event) {
 
            event.preventDefault();
 
 
            const time1 =
                parseTugDecimal(
                    tugAttempt1.value
                );
 
            const time2 =
                parseTugDecimal(
                    tugAttempt2.value
                );
 
            const baseline =
                parseTugDecimal(
                    tugBaseline.value
                );
 
 
            /* ==========================================
            INTENTO 1 — OBLIGATORIO
            ========================================== */
 
            if (
                time1 === null ||
                time1 <= 0
            ) {
 
                showTugValidation(
                    "Ingrese un tiempo válido mayor que cero para el intento 1."
                );
 
                return;
 
            }
 
 
            /* ==========================================
            INTENTO 2 — OPCIONAL
            ========================================== */
 
            if (
                tugAttempt2.value.trim() &&
                (
                    time2 === null ||
                    time2 <= 0
                )
            ) {
 
                showTugValidation(
                    "El intento 2 debe ser un tiempo válido mayor que cero o dejarse vacío."
                );
 
                return;
 
            }
 
 
            /* ==========================================
            TIEMPO PREVIO — OPCIONAL
            ========================================== */
 
            if (
                tugBaseline.value.trim() &&
                (
                    baseline === null ||
                    baseline <= 0
                )
            ) {
 
                showTugValidation(
                    "El tiempo previo debe ser un valor válido mayor que cero o dejarse vacío."
                );
 
                return;
 
            }
 
 
            /* ==========================================
            TIEMPOS REGISTRADOS
            ========================================== */
 
            const times =
                time2 === null
                    ? [time1]
                    : [time1, time2];
 
 
            const averageTime =
                times.reduce(
                    function (sum, time) {
                        return sum + time;
                    },
                    0
                ) / times.length;
 
 
            /* ==========================================
            DATOS DE REGISTRO
            ========================================== */
 
            let aidText =
                tugAid.options[
                    tugAid.selectedIndex
                ].text;
 
 
            if (
                tugAid.value === "otra" &&
                tugOtherAid.value.trim()
            ) {
 
                aidText =
                    "Otra: " +
                    tugOtherAid.value.trim();
 
            }
 
 
            setTugText(
                "tugResultAid",
                aidText
            );
 
 
            setTugText(
                "tugResultAttempt1",
                formatTugNumber(time1) +
                " s"
            );
 
 
            setTugText(
                "tugResultAttempt2",
                time2 === null
                    ? "No registrado"
                    : formatTugNumber(time2) +
                      " s"
            );
 
 
            setTugText(
                "tugResultAverageTime",
                formatTugNumber(averageTime) +
                " s"
            );
 
 
            setTugText(
                "tugPrimaryResult",
                formatTugNumber(averageTime) +
                " s"
            );
 
 
            setTugText(
                "tugAttemptNote",
                times.length === 1
                    ? "Resultado calculado con un solo intento."
                    : "Resultado calculado a partir de dos intentos."
            );
 
 
            /* ==========================================
            INTERPRETACIÓN CLÍNICA
            ========================================== */
 
            const interpretation =
                interpretTugTime(averageTime);
 
            tugInterpretationLabel.textContent =
                interpretation.label;
 
            tugInterpretationDescription.textContent =
                interpretation.description;
 
            tugInterpretationBox.classList.remove(
                "tug-independent",
                "tug-mild",
                "tug-variable",
                "tug-impaired"
            );
 
            tugInterpretationBox.classList.add(
                interpretation.className
            );
 
 
            /* ==========================================
            CAMBIO ABSOLUTO
            (en TUG, menor tiempo = mejor desempeño)
            ========================================== */
 
            if (baseline === null) {
 
                tugChangeRow.hidden =
                    true;
 
                tugChangeDescription.textContent =
                    "";
 
            } else {
 
                const absoluteChange =
                    averageTime - baseline;
 
                const changePrefix =
                    absoluteChange > 0
                        ? "+"
                        : "";
 
                let changeDescription = "";
 
                if (absoluteChange < 0) {
 
                    changeDescription =
                        "El tiempo actual es menor que el registrado previamente, lo que puede reflejar una mejoría en el desempeño funcional.";
 
                } else if (absoluteChange > 0) {
 
                    changeDescription =
                        "El tiempo actual es mayor que el registrado previamente, lo que puede reflejar una disminución en el desempeño funcional.";
 
                } else {
 
                    changeDescription =
                        "El tiempo actual es igual al registrado previamente.";
 
                }
 
                setTugText(
                    "tugResultChange",
                    changePrefix +
                    formatTugNumber(absoluteChange) +
                    " s"
                );
 
                tugChangeDescription.textContent =
                    changeDescription;
 
                tugChangeRow.hidden =
                    false;
 
            }
             /* ---------------------------------------------
               MOSTRAR MCID
               --------------------------------------------- */

            if (tugMcidNote) {
                tugMcidNote.hidden = false;
            }

            clearTugValidation();
 
            tugResults.hidden =
                false;
 
        }
    );
 
}
/* ==========================================================
   CALCULADORA MOTRICITY INDEX
   ========================================================== */

const motricityCalculator =
    document.getElementById("motricityCalculator");

if (motricityCalculator) {

    const motricityArmItems =
        document.getElementById("motricityArmItems");

    const motricityLegItems =
        document.getElementById("motricityLegItems");

    const motricityValidation =
        document.getElementById("motricityValidation");

    const motricityResults =
        document.getElementById("motricityResults");


    /* ==========================================
    ESCALAS DE PUNTUACIÓN OFICIALES
    (Demeurisse et al., 1980 / Collin y Wade, 1990)
    ========================================== */

    const motricityPinchOptions = [
        {
            value: 0,
            label: "No hay ningún movimiento."
        },
        {
            value: 11,
            label: "Inicio de prensión: se observa algún movimiento del dedo o del pulgar."
        },
        {
            value: 19,
            label: "Toma el cubo, pero no puede sostenerlo contra gravedad."
        },
        {
            value: 22,
            label: "Toma y sostiene el cubo contra gravedad, pero no contra una tracción leve."
        },
        {
            value: 26,
            label: "Sostiene el cubo contra una tracción leve, pero con menor fuerza que el lado contrario."
        },
        {
            value: 33,
            label: "Fuerza de prensión normal."
        }
    ];

    const motricityStandardOptions = [
        {
            value: 0,
            label: "No hay ningún movimiento."
        },
        {
            value: 9,
            label: "Contracción muscular palpable, sin movimiento visible."
        },
        {
            value: 14,
            label: "Movimiento visible, sin rango completo y no contra gravedad."
        },
        {
            value: 19,
            label: "Rango completo de movimiento contra gravedad, pero no contra resistencia."
        },
        {
            value: 25,
            label: "Movimiento contra resistencia, pero más débil que el lado contrario."
        },
        {
            value: 33,
            label: "Fuerza normal."
        }
    ];


    /* ==========================================
    ÍTEMS — EXTREMIDAD SUPERIOR Y INFERIOR
    ========================================== */

    const motricityArmData = [
        {
            id: "prension",
            number: 1,
            title: "Prensión (pinza)",
            options: motricityPinchOptions
        },
        {
            id: "flexion-codo",
            number: 2,
            title: "Flexión de codo",
            options: motricityStandardOptions
        },
        {
            id: "abduccion-hombro",
            number: 3,
            title: "Abducción de hombro",
            options: motricityStandardOptions
        }
    ];

    const motricityLegData = [
        {
            id: "flexion-cadera",
            number: 4,
            title: "Flexión de cadera",
            options: motricityStandardOptions
        },
        {
            id: "extension-rodilla",
            number: 5,
            title: "Extensión de rodilla",
            options: motricityStandardOptions
        },
        {
            id: "dorsiflexion-tobillo",
            number: 6,
            title: "Dorsiflexión de tobillo",
            options: motricityStandardOptions
        }
    ];


    /* ==========================================
    RENDERIZADO DE ÍTEMS
    ========================================== */

    function renderMotricityItems(data) {

        return data.map(function (item) {

            return `
                <fieldset class="motricity-item">
                    <legend>
                        <span class="motricity-item-number">
                            ${String(item.number).padStart(2, "0")}
                        </span>
                        ${item.title}
                    </legend>

                    <div class="motricity-options">

                        ${item.options.map(function (option, index) {

                            const optionId =
                                `motricity-${item.id}-${index}`;

                            return `
                                <label
                                    class="motricity-option"
                                    for="${optionId}"
                                >
                                    <input
                                        id="${optionId}"
                                        type="radio"
                                        name="motricity-${item.id}"
                                        value="${option.value}"
                                    >

                                    <span class="motricity-option-content">
                                        <strong>
                                            ${option.value} puntos
                                        </strong>

                                        <span>
                                            ${option.label}
                                        </span>
                                    </span>
                                </label>
                            `;

                        }).join("")}

                    </div>
                </fieldset>
            `;

        }).join("");

    }

    motricityArmItems.innerHTML =
        renderMotricityItems(motricityArmData);

    motricityLegItems.innerHTML =
        renderMotricityItems(motricityLegData);


    /* ==========================================
    RESALTAR OPCIÓN SELECCIONADA
    ========================================== */

    motricityCalculator.addEventListener(
        "change",
        function (event) {

            if (
                event.target.matches(
                    'input[type="radio"][name^="motricity-"]'
                )
            ) {

                const selectedOption =
                    event.target.closest(".motricity-option");

                if (selectedOption) {

                    const item =
                        event.target.closest(".motricity-item");

                    if (item) {

                        item
                            .querySelectorAll(".motricity-option")
                            .forEach(function (option) {

                                option.classList.remove(
                                    "selected"
                                );

                            });

                        selectedOption.classList.add(
                            "selected"
                        );

                    }

                }

            }

        }
    );


    /* ==========================================
    INTERPRETACIÓN ORIENTATIVA POR RANGOS
    (no corresponde a un punto de corte
    validado universalmente)
    ========================================== */

    function interpretMotricityScore(score) {

        if (score <= 32) {

            return {
                label: "Compromiso motor severo",
                className: "motricity-severe",
                description:
                    "Puntaje bajo dentro del rango posible, " +
                    "compatible con un compromiso motor severo " +
                    "de la extremidad evaluada."
            };

        }

        if (score <= 65) {

            return {
                label: "Compromiso motor moderado",
                className: "motricity-moderate",
                description:
                    "Puntaje intermedio, compatible con un " +
                    "compromiso motor moderado de la extremidad " +
                    "evaluada."
            };

        }

        if (score <= 99) {

            return {
                label: "Compromiso motor leve",
                className: "motricity-mild",
                description:
                    "Puntaje cercano al máximo posible, " +
                    "compatible con un compromiso motor leve " +
                    "de la extremidad evaluada."
            };

        }

        return {
            label: "Fuerza motora conservada",
            className: "motricity-normal",
            description:
                "Puntaje máximo posible en los movimientos " +
                "evaluados de la extremidad."
        };

    }


    /* ==========================================
    VALIDACIÓN Y CÁLCULO
    ========================================== */

    motricityCalculator.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const motricityItemGroups =
                new Set();

            motricityCalculator
                .querySelectorAll('input[type="radio"]')
                .forEach(function (radio) {

                    motricityItemGroups.add(
                        radio.name
                    );

                });


            let unansweredItems = [];

            motricityItemGroups.forEach(
                function (groupName) {

                    const selected =
                        motricityCalculator.querySelector(
                            `input[name="${groupName}"]:checked`
                        );

                    if (!selected) {

                        unansweredItems.push(
                            groupName
                        );

                    }

                }
            );


            if (unansweredItems.length > 0) {

                motricityValidation.textContent =
                    "Debe seleccionar una puntuación para los seis movimientos antes de calcular el resultado.";

                motricityValidation.hidden =
                    false;

                motricityResults.hidden =
                    true;

                motricityValidation.focus();

                return;

            }

            motricityValidation.textContent =
                "";

            motricityValidation.hidden =
                true;


            /* ==========================================
            PUNTAJE POR EXTREMIDAD
            (suma de los 3 movimientos + 1 punto)
            ========================================== */

            function sumGroupScore(data) {

                let total = 0;

                data.forEach(function (item) {

                    const selected =
                        motricityCalculator.querySelector(
                            `input[name="motricity-${item.id}"]:checked`
                        );

                    if (selected) {
                        total += Number(selected.value);
                    }

                });

                return total + 1;

            }

            const armScore =
                sumGroupScore(motricityArmData);

            const legScore =
                sumGroupScore(motricityLegData);

            const sideScore =
                (armScore + legScore) / 2;

            const armInterpretation =
                interpretMotricityScore(armScore);

            const legInterpretation =
                interpretMotricityScore(legScore);


            /* ==========================================
            RENDERIZADO DE RESULTADOS
            ========================================== */

            motricityResults.innerHTML = `

                <div class="scale-table">

                    <div class="scale-row scale-header">
                        <span>Resultado</span>
                        <span>Puntaje</span>
                    </div>

                    <div class="scale-row">
                        <span>Extremidad superior</span>
                        <span>${armScore} / 100</span>
                    </div>

                    <div class="scale-row">
                        <span>Extremidad inferior</span>
                        <span>${legScore} / 100</span>
                    </div>

                    <div class="scale-row">
                        <span>Puntaje combinado</span>
                        <span>${sideScore.toFixed(1)} / 100</span>
                    </div>

                </div>

                <div class="coming-soon motricity-interpretation ${armInterpretation.className}">
                    <strong>Extremidad superior — ${armScore} / 100</strong>
                    <p><strong>${armInterpretation.label}</strong></p>
                    <p>${armInterpretation.description}</p>
                </div>

                <div class="coming-soon motricity-interpretation ${legInterpretation.className}">
                    <strong>Extremidad inferior — ${legScore} / 100</strong>
                    <p><strong>${legInterpretation.label}</strong></p>
                    <p>${legInterpretation.description}</p>
                </div>

                <!-- MCID -->
                <p class="motricity-mcid-note">
                    <strong>MCID:</strong>
                    un cambio ≥ 10 puntos entre evaluaciones en cualquiera
                    de las dos extremidades puede considerarse clínicamente
                    relevante en ACV.
                </p>

            `;

            motricityResults.hidden =
                false;

        }
    );

}

// FUGL MEYER ASSESSMENT - FMA-UE
   
if (document.getElementById("fmaCalculator")) {

       const FMAUE_ITEMS = [

        /* =====================================================
           DOMINIO A — HOMBRO · CODO · ANTEBRAZO
           I · ACTIVIDAD REFLEJA
           ===================================================== */

        {
            id: 1,
            domain: "A",
            title: "Actividad refleja",
            description: "Bíceps",
            scores: {
                0: "Ausencia de actividad refleja",
                1: "Actividad refleja disminuida",
                2: "Actividad refleja normal"
            }
        },

        {
            id: 2,
            domain: "A",
            title: "Actividad refleja",
            description: "Tríceps",
            scores: {
                0: "Ausencia de actividad refleja",
                1: "Actividad refleja disminuida",
                2: "Actividad refleja normal"
            }
        },


        /* =====================================================
           II · MOVIMIENTOS DENTRO DE SINERGIAS
           ===================================================== */

        {
            id: 3,
            domain: "A",
            title: "Retracción de hombro",
            description: "Movimiento dentro de la sinergia flexora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 4,
            domain: "A",
            title: "Elevación de hombro",
            description: "Movimiento dentro de la sinergia flexora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 5,
            domain: "A",
            title: "Abducción de hombro",
            description: "Movimiento dentro de la sinergia flexora (al menos 90°)",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 6,
            domain: "A",
            title: "Rotación externa de hombro",
            description: "Movimiento dentro de la sinergia flexora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 7,
            domain: "A",
            title: "Flexión de codo",
            description: "Movimiento dentro de la sinergia flexora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 8,
            domain: "A",
            title: "Supinación de antebrazo",
            description: "Movimiento dentro de la sinergia flexora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 9,
            domain: "A",
            title: "Aducción / rotación interna de hombro",
            description: "Movimiento dentro de la sinergia extensora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 10,
            domain: "A",
            title: "Extensión de codo",
            description: "Movimiento dentro de la sinergia extensora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 11,
            domain: "A",
            title: "Pronación de antebrazo",
            description: "Movimiento dentro de la sinergia extensora",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },


        /* =====================================================
           III · MOVIMIENTOS CON SINERGIAS MIXTAS
           ===================================================== */

        {
            id: 12,
            domain: "A",
            title: "Mano a la región lumbar",
            description: "Movimiento combinando sinergias",
            scores: {
                0: "No realiza una acción específica",
                1: "La mano sobrepasa la espina ilíaca anterosuperior",
                2: "Realiza el movimiento sin dificultad"
            }
        },

        {
            id: 13,
            domain: "A",
            title: "Flexión de hombro 0°-90°",
            description: "Con el codo en extensión",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 14,
            domain: "A",
            title: "Pronación / supinación de antebrazo",
            description: "Con el codo a 90° y el hombro a 0°",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },


        /* =====================================================
           IV · MOVIMIENTOS CON POCA O NINGUNA SINERGIA
           ===================================================== */

        {
            id: 15,
            domain: "A",
            title: "Abducción de hombro 0°-90°",
            description: "Codo en extensión, antebrazo pronado",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 16,
            domain: "A",
            title: "Flexión de hombro 90°-180°",
            description: "Codo en extensión, antebrazo neutro",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 17,
            domain: "A",
            title: "Pronación / supinación de antebrazo",
            description: "Codo en extensión, hombro flexionado 30°-90°",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },


        /* =====================================================
           V · ACTIVIDAD REFLEJA NORMAL
           ===================================================== */

        {
            id: 18,
            domain: "A",
            title: "Actividad refleja",
            description: "Bíceps, tríceps y flexores de los dedos",
            scores: {
                0: "Al menos dos reflejos claramente hiperactivos",
                1: "Un reflejo hiperactivo o al menos dos vivos",
                2: "Como máximo un reflejo vivo, ninguno hiperactivo"
            }
        },


        /* =====================================================
           DOMINIO B — MUÑECA
           ===================================================== */

        {
            id: 19,
            domain: "B",
            title: "Estabilidad de muñeca",
            description: "Codo a 90°, hombro a 0°",
            scores: {
                0: "No puede mantener la posición",
                1: "Mantiene la posición parcialmente",
                2: "Mantiene la posición completamente"
            }
        },

        {
            id: 20,
            domain: "B",
            title: "Flexión / extensión de muñeca",
            description: "Codo a 90°, hombro a 0°",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 21,
            domain: "B",
            title: "Estabilidad de muñeca",
            description: "Codo en extensión, hombro a 30°",
            scores: {
                0: "No puede mantener la posición",
                1: "Mantiene la posición parcialmente",
                2: "Mantiene la posición completamente"
            }
        },

        {
            id: 22,
            domain: "B",
            title: "Flexión / extensión de muñeca",
            description: "Codo en extensión",
            scores: {
                0: "No puede realizar el movimiento",
                1: "Realiza el movimiento parcialmente",
                2: "Realiza el movimiento completamente"
            }
        },

        {
            id: 23,
            domain: "B",
            title: "Circunducción de muñeca",
            description: "Movimiento activo de la muñeca",
            scores: {
                0: "No puede realizarla",
                1: "Realiza un movimiento incompleto",
                2: "Realiza una circunducción completa y suave"
            }
        },


        /* =====================================================
           DOMINIO C — MANO
           ===================================================== */

        {
            id: 24,
            domain: "C",
            title: "Flexión masiva de dedos",
            description: "Movimiento de la mano",
            scores: {
                0: "No se produce flexión",
                1: "Flexión incompleta",
                2: "Flexión activa comparable con el lado sano"
            }
        },

        {
            id: 25,
            domain: "C",
            title: "Extensión masiva de dedos",
            description: "Movimiento de la mano",
            scores: {
                0: "No se produce extensión",
                1: "Puede liberar una prensión previa",
                2: "Extensión activa completa"
            }
        },

        {
            id: 26,
            domain: "C",
            title: "Prensión en gancho",
            description: "Metacarpofalángicas en extensión, interfalángicas en flexión",
            scores: {
                0: "No puede realizar la prensión",
                1: "Sostiene con fuerza débil",
                2: "Mantiene contra resistencia relativamente fuerte"
            }
        },

        {
            id: 27,
            domain: "C",
            title: "Aducción de pulgar",
            description: "Sostener una hoja de papel entre pulgar e índice",
            scores: {
                0: "No puede realizarlo",
                1: "Sostiene, pero no resiste una tracción leve",
                2: "Sostiene firmemente contra tracción"
            }
        },

        {
            id: 28,
            domain: "C",
            title: "Prensión en pinza",
            description: "Sostener un lápiz entre pulgar e índice",
            scores: {
                0: "No puede realizar la prensión",
                1: "Realiza la prensión parcialmente",
                2: "Realiza la prensión completamente"
            }
        },

        {
            id: 29,
            domain: "C",
            title: "Prensión cilíndrica",
            description: "Sostener un objeto cilíndrico",
            scores: {
                0: "No puede realizar la prensión",
                1: "Realiza la prensión parcialmente",
                2: "Realiza la prensión completamente"
            }
        },

        {
            id: 30,
            domain: "C",
            title: "Prensión esférica",
            description: "Sostener una pelota pequeña",
            scores: {
                0: "No puede realizar la prensión",
                1: "Realiza la prensión parcialmente",
                2: "Realiza la prensión completamente"
            }
        },


        /* =====================================================
           DOMINIO D — COORDINACIÓN Y VELOCIDAD
           ===================================================== */

        {
            id: 31,
            domain: "D",
            title: "Temblor",
            description: "Prueba dedo-nariz, 5 repeticiones, ojos cerrados",
            scores: {
                0: "Temblor marcado",
                1: "Temblor leve",
                2: "Ausencia de temblor"
            }
        },

        {
            id: 32,
            domain: "D",
            title: "Dismetría",
            description: "Prueba dedo-nariz, 5 repeticiones, ojos cerrados",
            scores: {
                0: "Dismetría marcada o no sistemática",
                1: "Dismetría leve y sistemática",
                2: "Sin dismetría"
            }
        },

        {
            id: 33,
            domain: "D",
            title: "Velocidad",
            description: "Tiempo comparado con el miembro no afectado (ver registro de tiempos más abajo)",
            scores: {
                0: "La diferencia de tiempo es mayor de 5 segundos",
                1: "La diferencia de tiempo está entre 2 y 5 segundos",
                2: "La diferencia de tiempo es menor de 2 segundos"
            }
        }

    ];


    /* ==========================================
    OBTENER UN ÍTEM POR ID
    ========================================== */

    function getFMAUEItem(id) {

        return FMAUE_ITEMS.find(function (item) {
            return item.id === id;
        });

    }


      function getFMAUEContainer(id) {

        if (id >= 1 && id <= 2) return "1-2";
        if (id >= 3 && id <= 11) return "3-11";
        if (id >= 12 && id <= 14) return "12-14";
        if (id >= 15 && id <= 17) return "15-17";
        if (id === 18) return "18";
        if (id >= 19 && id <= 23) return "19-23";
        if (id >= 24 && id <= 30) return "24-30";
        if (id >= 31 && id <= 33) return "31-33";

        return "";

    }


    function createFMAUEItem(item) {

        const wrapper =
            document.createElement("article");

        wrapper.className = "fma-item";
        wrapper.dataset.item = item.id;

        wrapper.innerHTML = `

            <div class="fma-item-header">

                <div class="fma-item-number">
                    ${item.id}
                </div>

                <div class="fma-item-title-wrap">
                    <h5>${item.title}</h5>
                    <p>${item.description}</p>
                </div>

            </div>


            <div class="fma-score-options">

                <button
                    type="button"
                    class="fma-score-button"
                    data-score="0"
                    aria-label="Ítem ${item.id}, puntuación 0"
                >
                    <span class="fma-score-value">0</span>
                    <span class="fma-score-label">${item.scores[0]}</span>
                </button>

                <button
                    type="button"
                    class="fma-score-button"
                    data-score="1"
                    aria-label="Ítem ${item.id}, puntuación 1"
                >
                    <span class="fma-score-value">1</span>
                    <span class="fma-score-label">${item.scores[1]}</span>
                </button>

                <button
                    type="button"
                    class="fma-score-button"
                    data-score="2"
                    aria-label="Ítem ${item.id}, puntuación 2"
                >
                    <span class="fma-score-value">2</span>
                    <span class="fma-score-label">${item.scores[2]}</span>
                </button>

            </div>

        `;

        return wrapper;

    }


    /* ==========================================
    RENDERIZAR LOS 33 ÍTEMS
    ========================================== */

    function renderFMAUEItems() {

        FMAUE_ITEMS.forEach(function (item) {

            const container =
                document.getElementById(
                    "fma-items-" + getFMAUEContainer(item.id)
                );

            if (!container) {
                return;
            }

            container.appendChild(
                createFMAUEItem(item)
            );

        });

    }


    /* ==========================================
    ESTADO DE LA EVALUACIÓN
    ========================================== */

    const fmaUEState = {
        scores: {},
        unaffectedTime: null,
        affectedTime: null
    };


    function setFMAUEScore(itemId, score) {

        fmaUEState.scores[itemId] = Number(score);

        updateFMAUEInterface();

    }


    function getFMAUEScore(itemId) {

        if (
            Object.prototype.hasOwnProperty.call(
                fmaUEState.scores,
                itemId
            )
        ) {
            return fmaUEState.scores[itemId];
        }

        return null;

    }


    /* ==========================================
    CÁLCULO DE SUBTOTALES Y TOTAL
    ========================================== */

    function calculateFMAUESubtotal(start, end) {

        let total = 0;

        for (let id = start; id <= end; id++) {

            const score = getFMAUEScore(id);

            if (score !== null) {
                total += score;
            }

        }

        return total;

    }


    function calculateFMAUETotal() {

        return calculateFMAUESubtotal(1, 33);

    }


    function countFMAUECompleted() {

        let completed = 0;

        for (let id = 1; id <= 33; id++) {

            if (getFMAUEScore(id) !== null) {
                completed++;
            }

        }

        return completed;

    }


    function setElementText(id, text) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = text;
        }

    }


    /* ==========================================
    ACTUALIZAR SUBTOTALES POR DOMINIO
    ========================================== */

    function updateFMAUESubtotals() {

        const subtotalA = calculateFMAUESubtotal(1, 18);
        const subtotalB = calculateFMAUESubtotal(19, 23);
        const subtotalC = calculateFMAUESubtotal(24, 30);
        const subtotalD = calculateFMAUESubtotal(31, 33);

        setElementText("fmaSubtotalA", subtotalA);
        setElementText("fmaSubtotalB", subtotalB);
        setElementText("fmaSubtotalC", subtotalC);
        setElementText("fmaSubtotalD", subtotalD);

        setElementText("domainScoreA", subtotalA + " / 36");
        setElementText("domainScoreB", subtotalB + " / 10");
        setElementText("domainScoreC", subtotalC + " / 14");
        setElementText("domainScoreD", subtotalD + " / 6");

    }


    /* ==========================================
    ACTUALIZAR BARRA DE PROGRESO
    ========================================== */

    function updateFMAUEProgress() {

        const completed = countFMAUECompleted();
        const progress = (completed / 33) * 100;

        setElementText("fmaProgressText", completed + " / 33");

        const progressBar =
            document.getElementById("fmaProgressBar");

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

    }


    /* ==========================================
    ACTUALIZAR RESULTADO FINAL
    ========================================== */

    function updateFMAUEResult() {

    const total = calculateFMAUETotal();
    const completed = countFMAUECompleted();

    setElementText("fmaFinalScore", total);
    setElementText("fmaTotal", total);

    const percentageValue = (total / 66) * 100;

    setElementText(
        "fmaPercentage",
        percentageValue.toFixed(1) + " %"
    );

    const message = document.getElementById("fmaResultMessage");
    if (message) {
        message.textContent = completed < 33
            ? "Se han registrado " + completed + " de 33 ítems."
            : "Evaluación FMA-UE completada. Puntuación total: " + total + " / 66.";
    }

    const completion = document.getElementById("fmaCompletionMessage");
    if (completion) {
        completion.textContent = completed < 33
            ? "Complete los " + (33 - completed) + " ítems restantes para obtener el resultado final."
            : "Evaluación completa. Revise el resultado antes de registrarlo en la historia clínica.";
    }

    updateFMAUEInterpretation(total, completed);
}


/* ==========================================
   INTERPRETACIÓN CLÍNICA — FMA-UE
   ========================================== */

function interpretFmaByPercentage(percentage) {

    if (percentage <= 25) {
        return {
            label: "Compromiso motor severo",
            className: "fma-severe",
            description:
                "El desempeño se encuentra en un rango compatible con " +
                "compromiso motor severo en la extremidad evaluada. " +
                "Se recomienda priorizar objetivos funcionales básicos, " +
                "prevención de complicaciones y abordaje del tono muscular."
        };
    }

    if (percentage <= 50) {
        return {
            label: "Compromiso motor moderado-severo",
            className: "fma-moderate-severe",
            description:
                "El desempeño sugiere un compromiso motor moderado-severo. " +
                "Puede ser útil combinar estrategias de facilitación motora, " +
                "práctica orientada a tareas y manejo de sinergias."
        };
    }

    if (percentage <= 75) {
        return {
            label: "Compromiso motor moderado",
            className: "fma-moderate",
            description:
                "El desempeño corresponde a un compromiso motor moderado. " +
                "Es recomendable trabajar control selectivo del movimiento, " +
                "disociación de sinergias y actividades funcionales progresivas."
        };
    }

    if (percentage <= 95) {
        return {
            label: "Compromiso motor leve",
            className: "fma-mild",
            description:
                "El desempeño indica un compromiso motor leve. " +
                "La intervención puede orientarse al refinamiento de la " +
                "coordinación, destreza fina y participación en actividades " +
                "complejas de la vida diaria."
        };
    }

    return {
        label: "Función motora prácticamente conservada",
        className: "fma-conserved",
        description:
            "El desempeño se encuentra en un rango cercano al máximo posible. " +
            "Puede ser útil mantener la función a través de actividad física, " +
            "entrenamiento de fuerza y prevención de recurrencias."
    };
}


function updateFMAUEInterpretation(total, completed) {

    const box =
        document.getElementById("fmaUeInterpretationBox");

    const label =
        document.getElementById("fmaUeInterpretationLabel");

    const description =
        document.getElementById("fmaUeInterpretationDescription");

    const mcidNote =
        document.getElementById("fmaUeMcidNote");

    if (!box || !label || !description) {
        return;
    }


    /* ------------------------------------------
       ESTADO INCOMPLETO
       ------------------------------------------ */

    if (completed < 33) {

        box.classList.remove(
            "fma-severe",
            "fma-moderate-severe",
            "fma-moderate",
            "fma-mild",
            "fma-conserved"
        );

        label.textContent =
            "Complete la evaluación para obtener la interpretación.";

        description.textContent =
            "Se han registrado " + completed + " de 33 ítems. " +
            "La interpretación clínica se mostrará al completar la evaluación.";

        if (mcidNote) {
            mcidNote.hidden = true;
        }

        return;
    }


    /* ------------------------------------------
       INTERPRETACIÓN SEGÚN PORCENTAJE
       ------------------------------------------ */

    const percentage = (total / 66) * 100;

    const interpretation =
        interpretFmaByPercentage(percentage);

    label.textContent =
        interpretation.label;

    description.textContent =
        interpretation.description;

    box.classList.remove(
        "fma-severe",
        "fma-moderate-severe",
        "fma-moderate",
        "fma-mild",
        "fma-conserved"
    );

    box.classList.add(interpretation.className);

    if (mcidNote) {
        mcidNote.hidden = false;
    }
}

    /* ==========================================
    ACTUALIZAR ESTADO VISUAL DE LOS BOTONES
    ========================================== */

    function updateFMAUEScoreButtons() {

        document
            .querySelectorAll(".fma-item")
            .forEach(function (item) {

                const itemId = Number(item.dataset.item);
                const score = getFMAUEScore(itemId);

                item
                    .querySelectorAll(".fma-score-button")
                    .forEach(function (button) {

                        const isSelected =
                            score !== null &&
                            Number(button.dataset.score) === score;

                        button.classList.toggle(
                            "selected",
                            isSelected
                        );

                    });

            });

    }


    /* ==========================================
    ACTUALIZAR TODA LA INTERFAZ
    ========================================== */

    function updateFMAUEInterface() {

        updateFMAUESubtotals();
        updateFMAUEProgress();
        updateFMAUEResult();
        updateFMAUEScoreButtons();

    }


    /* ==========================================
    EVENTOS DE PUNTUACIÓN (DELEGACIÓN)
    ========================================== */

    function initFMAUEScoreButtons() {

        const calculator =
            document.getElementById("fmaCalculator");

        if (!calculator) {
            return;
        }

        calculator.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(".fma-score-button");

                if (!button) {
                    return;
                }

                const item =
                    button.closest(".fma-item");

                if (!item) {
                    return;
                }

                const itemId = Number(item.dataset.item);
                const score = Number(button.dataset.score);

                setFMAUEScore(itemId, score);

            }
        );

    }


    /* ==========================================
    REGISTRO DE TIEMPOS — ÍTEM 33
    (calcula y asigna automáticamente la
    puntuación del ítem 33 a partir de la
    diferencia de tiempos)
    ========================================== */

    function resetTimeInputs() {

        const unaffected =
            document.getElementById("fmaUnaffectedTime");

        const affected =
            document.getElementById("fmaAffectedTime");

        const result =
            document.getElementById("fmaTimeResult");

        if (unaffected) unaffected.value = "";
        if (affected) affected.value = "";

        if (result) {
            result.textContent =
                "Introduzca ambos tiempos para calcular el ítem 33.";
        }

    }


    function initFMATiming() {

        const unaffected =
            document.getElementById("fmaUnaffectedTime");

        const affected =
            document.getElementById("fmaAffectedTime");

        const result =
            document.getElementById("fmaTimeResult");

        if (!unaffected || !affected || !result) {
            return;
        }

        function calculateTimeScore() {

            const unaffectedValue = parseFloat(unaffected.value);
            const affectedValue = parseFloat(affected.value);

            fmaUEState.unaffectedTime =
                Number.isFinite(unaffectedValue) ? unaffectedValue : null;

            fmaUEState.affectedTime =
                Number.isFinite(affectedValue) ? affectedValue : null;

            if (
                fmaUEState.unaffectedTime === null ||
                fmaUEState.affectedTime === null
            ) {

                result.textContent =
                    "Introduzca ambos tiempos para calcular el ítem 33.";

                return;

            }

            if (
                fmaUEState.unaffectedTime <= 0 ||
                fmaUEState.affectedTime <= 0
            ) {

                result.textContent =
                    "Los tiempos deben ser mayores que cero.";

                return;

            }

            const difference =
                fmaUEState.affectedTime - fmaUEState.unaffectedTime;

            let suggestedScore;

            if (difference < 2) {
                suggestedScore = 2;
            } else if (difference <= 5) {
                suggestedScore = 1;
            } else {
                suggestedScore = 0;
            }

            result.textContent =
                "Diferencia: " + difference.toFixed(1) +
                " s · Puntuación asignada al ítem 33: " + suggestedScore + ".";

            setFMAUEScore(33, suggestedScore);

        }

        unaffected.addEventListener("input", calculateTimeScore);
        affected.addEventListener("input", calculateTimeScore);

    }


    /* ==========================================
    REINICIAR EVALUACIÓN
    ========================================== */

    function resetFMAUE() {

        fmaUEState.scores = {};
        fmaUEState.unaffectedTime = null;
        fmaUEState.affectedTime = null;

        resetTimeInputs();
        updateFMAUEInterface();

    }


    function initFMAUEReset() {

        const resetButton =
            document.getElementById("fmaReset");

        if (!resetButton) {
            return;
        }

        resetButton.addEventListener(
            "click",
            function () {

                const confirmed = window.confirm(
                    "¿Está seguro de que desea reiniciar toda la evaluación FMA-UE?"
                );

                if (!confirmed) {
                    return;
                }

                resetFMAUE();

            }
        );

    }


    /* ==========================================
    INICIALIZACIÓN
    ========================================== */

    renderFMAUEItems();
    initFMAUEScoreButtons();
    initFMATiming();
    initFMAUEReset();
    updateFMAUEInterface();

}

/* ==========================================================
   FUGL-MEYER ASSESSMENT — MIEMBRO INFERIOR (FMA-LE)
   CALCULADORA CLÍNICA (17 ÍTEMS / 34 PUNTOS)
   Basada en el manual internacional acordado
   (Universidad de Gotemburgo, 2026)
   ========================================================== */

if (document.getElementById("fmaLeCalculator")) {

    /* ==========================================
    DEFINICIÓN DE LOS 17 ÍTEMS
    ========================================== */

    const FMALE_ITEMS = [

        /* =====================================================
           I · ACTIVIDAD REFLEJA (decúbito supino)
           Solo 0 o 2, no existe puntaje de 1
           ===================================================== */

        {
            id: 1,
            title: "Reflejos flexores",
            description: "Flexores de rodilla",
            scores: {
                0: "Sin actividad refleja",
                2: "Se puede obtener actividad refleja"
            }
        },

        {
            id: 2,
            title: "Reflejos extensores",
            description: "Rotuliano y/o aquíleo (al menos uno)",
            scores: {
                0: "Sin actividad refleja",
                2: "Se puede obtener actividad refleja"
            }
        },


        /* =====================================================
           II · MOVIMIENTOS DENTRO DE SINERGIAS (decúbito supino)
           ===================================================== */

        {
            id: 3,
            title: "Flexión de cadera",
            description: "Sinergia flexora",
            scores: {
                0: "Sin flexión de cadera",
                1: "Realiza parcialmente, menos del rango pasivo completo",
                2: "Flexión de cadera completa"
            }
        },

        {
            id: 4,
            title: "Flexión de rodilla",
            description: "Sinergia flexora",
            scores: {
                0: "Sin flexión de rodilla",
                1: "Realiza parcialmente, menos del rango pasivo completo",
                2: "Flexión de rodilla completa"
            }
        },

        {
            id: 5,
            title: "Dorsiflexión de tobillo",
            description: "Sinergia flexora",
            scores: {
                0: "Sin dorsiflexión de tobillo",
                1: "Realiza parcialmente, menos del rango pasivo completo",
                2: "Dorsiflexión de tobillo completa"
            }
        },

        {
            id: 6,
            title: "Extensión de cadera",
            description: "Sinergia extensora, con resistencia",
            scores: {
                0: "Sin extensión activa de cadera",
                1: "Realiza parcialmente, o más débil contra resistencia que el lado sano",
                2: "Extensión completa, fuerza comparable al lado sano"
            }
        },

        {
            id: 7,
            title: "Aducción de cadera",
            description: "Sinergia extensora, con resistencia",
            scores: {
                0: "Sin aducción activa de cadera",
                1: "Realiza parcialmente, o más débil contra resistencia que el lado sano",
                2: "Aducción completa hasta la línea media, fuerza comparable al lado sano"
            }
        },

        {
            id: 8,
            title: "Extensión de rodilla",
            description: "Sinergia extensora, con resistencia",
            scores: {
                0: "Sin extensión activa de rodilla",
                1: "Realiza parcialmente, o más débil contra resistencia que el lado sano",
                2: "Extensión completa, fuerza comparable al lado sano"
            }
        },

        {
            id: 9,
            title: "Flexión plantar de tobillo",
            description: "Sinergia extensora, con resistencia",
            scores: {
                0: "Sin flexión plantar activa",
                1: "Realiza parcialmente, o más débil contra resistencia que el lado sano",
                2: "Flexión plantar completa, fuerza comparable al lado sano"
            }
        },


        /* =====================================================
           III · MOVIMIENTO COMBINANDO SINERGIAS (sentado)
           ===================================================== */

        {
            id: 10,
            title: "Flexión de rodilla más allá de 90°",
            description: "Sentado, rodilla a 10 cm del borde de la camilla",
            scores: {
                0: "Sin flexión activa de rodilla",
                1: "Flexiona desde ligera extensión, pero no más allá de 90°",
                2: "Flexión de rodilla más allá de 90°"
            }
        },

        {
            id: 11,
            title: "Dorsiflexión de tobillo",
            description: "Sentado",
            scores: {
                0: "Sin dorsiflexión activa",
                1: "Realiza parcialmente, menos del rango pasivo completo",
                2: "Dorsiflexión completa"
            }
        },


        /* =====================================================
           IV · MOVIMIENTO CON POCA O NINGUNA SINERGIA (de pie)
           ===================================================== */

        {
            id: 12,
            title: "Flexión de rodilla a 90°",
            description: "De pie, cadera en 0°",
            scores: {
                0: "Sin flexión, o flexión de cadera inmediata al iniciar",
                1: "Menos de 90°, o pierde la extensión de cadera antes de llegar a 90°",
                2: "Flexión de rodilla a 90° manteniendo la cadera extendida"
            }
        },

        {
            id: 13,
            title: "Dorsiflexión de tobillo",
            description: "De pie",
            scores: {
                0: "Sin dorsiflexión, o flexión de cadera inmediata al iniciar",
                1: "Realiza parcialmente, o pierde la extensión de cadera antes de completar el movimiento",
                2: "Dorsiflexión completa manteniendo la cadera extendida"
            }
        },


        /* =====================================================
           V · ACTIVIDAD REFLEJA NORMAL
           (evaluar solo si el dominio IV = 4/4; si no, anotar 0)
           ===================================================== */

        {
            id: 14,
            title: "Actividad refleja normal",
            description: "Flexores de rodilla, rotuliano y aquíleo (solo si el dominio IV obtuvo 4/4)",
            scores: {
                0: "Al menos 2 de los 3 reflejos claramente hiperactivos, o el dominio IV obtuvo menos de 4",
                1: "Un reflejo claramente hiperactivo, o al menos 2 reflejos vivos",
                2: "Como máximo un reflejo vivo, ninguno hiperactivo"
            }
        },


        /* =====================================================
           F · COORDINACIÓN / VELOCIDAD
           (talón-rótula, decúbito supino, ojos cerrados, 5 rep.)
           ===================================================== */

        {
            id: 15,
            title: "Temblor",
            description: "Prueba talón-rótula, 5 repeticiones, ojos cerrados",
            scores: {
                0: "Temblor marcado, o no completa las 5 repeticiones",
                1: "Temblor leve",
                2: "Sin temblor en las 5 repeticiones"
            }
        },

        {
            id: 16,
            title: "Dismetría",
            description: "Prueba talón-rótula, 5 repeticiones, ojos cerrados",
            scores: {
                0: "Dismetría pronunciada o no sistemática, o no completa las 5 repeticiones",
                1: "Dismetría leve pero sistemática",
                2: "Sin dismetría en las 5 repeticiones"
            }
        },

        {
            id: 17,
            title: "Velocidad",
            description: "Tiempo comparado con la pierna no afectada (ver registro de tiempos más abajo)",
            scores: {
                0: "La pierna afectada es 6 segundos o más lenta que la no afectada",
                1: "La pierna afectada es entre 2.0 y 5.9 segundos más lenta",
                2: "La pierna afectada es menos de 2 segundos más lenta (o más rápida)"
            }
        }

    ];


    /* ==========================================
    OBTENER UN ÍTEM POR ID
    ========================================== */

    function getFMALEItem(id) {

        return FMALE_ITEMS.find(function (item) {
            return item.id === id;
        });

    }


    /* ==========================================
    DETERMINAR EL CONTENEDOR DE CADA ÍTEM
    (debe coincidir con los id="fma-le-items-..."
    definidos en el HTML)
    ========================================== */

    function getFMALEContainer(id) {

        if (id >= 1 && id <= 2) return "1-2";
        if (id >= 3 && id <= 9) return "3-9";
        if (id >= 10 && id <= 11) return "10-11";
        if (id >= 12 && id <= 13) return "12-13";
        if (id === 14) return "14";
        if (id >= 15 && id <= 17) return "15-17";

        return "";

    }


    /* ==========================================
    CREAR EL HTML DE CADA ÍTEM
    (mismas clases del calculador FMA-UE:
    fma-item, fma-item-title-wrap, fma-score-value,
    fma-score-label)
    ========================================== */

    function createFMALEItem(item) {

        const wrapper =
            document.createElement("article");

        wrapper.className = "fma-item";
        wrapper.dataset.item = item.id;

        /* Los ítems de reflejos (1 y 2) solo tienen
           puntajes 0 y 2, sin opción intermedia */

        const scoreKeys =
            Object.prototype.hasOwnProperty.call(item.scores, 1)
                ? [0, 1, 2]
                : [0, 2];

        const buttonsHtml = scoreKeys.map(function (scoreKey) {

            return `
                <button
                    type="button"
                    class="fma-score-button"
                    data-score="${scoreKey}"
                    aria-label="Ítem ${item.id}, puntuación ${scoreKey}"
                >
                    <span class="fma-score-value">${scoreKey}</span>
                    <span class="fma-score-label">${item.scores[scoreKey]}</span>
                </button>
            `;

        }).join("");

        wrapper.innerHTML = `

            <div class="fma-item-header">

                <div class="fma-item-number">
                    ${item.id}
                </div>

                <div class="fma-item-title-wrap">
                    <h5>${item.title}</h5>
                    <p>${item.description}</p>
                </div>

            </div>


            <div class="fma-score-options">
                ${buttonsHtml}
            </div>

        `;

        return wrapper;

    }


    /* ==========================================
    RENDERIZAR LOS 17 ÍTEMS
    ========================================== */

    function renderFMALEItems() {

        FMALE_ITEMS.forEach(function (item) {

            const container =
                document.getElementById(
                    "fma-le-items-" + getFMALEContainer(item.id)
                );

            if (!container) {
                return;
            }

            container.appendChild(
                createFMALEItem(item)
            );

        });

    }


    /* ==========================================
    ESTADO DE LA EVALUACIÓN
    ========================================== */

    const fmaLEState = {
        scores: {},
        unaffectedTime: null,
        affectedTime: null
    };


    function setFMALEScore(itemId, score) {

        fmaLEState.scores[itemId] = Number(score);

        updateFMALEInterface();

    }


    function getFMALEScore(itemId) {

        if (
            Object.prototype.hasOwnProperty.call(
                fmaLEState.scores,
                itemId
            )
        ) {
            return fmaLEState.scores[itemId];
        }

        return null;

    }


    /* ==========================================
    CÁLCULO DE SUBTOTALES Y TOTAL
    ========================================== */

    function calculateFMALESubtotal(ids) {

        let total = 0;

        ids.forEach(function (id) {

            const score = getFMALEScore(id);

            if (score !== null) {
                total += score;
            }

        });

        return total;

    }

    function rangeIds(start, end) {

        const ids = [];

        for (let id = start; id <= end; id++) {
            ids.push(id);
        }

        return ids;

    }

    function calculateFMALETotal() {

        return calculateFMALESubtotal(rangeIds(1, 17));

    }


    function countFMALECompleted() {

        let completed = 0;

        for (let id = 1; id <= 17; id++) {

            if (getFMALEScore(id) !== null) {
                completed++;
            }

        }

        return completed;

    }


    function setLeElementText(id, text) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = text;
        }

    }


    /* ==========================================
    ACTUALIZAR SUBTOTALES POR DOMINIO
    (A: items 1-9 / B: items 10-14 / C: items 15-17)
    ========================================== */

    function updateFMALESubtotals() {

        const subtotalA =
            calculateFMALESubtotal(rangeIds(1, 9));

        const subtotalB =
            calculateFMALESubtotal(rangeIds(10, 14));

        const subtotalC =
            calculateFMALESubtotal(rangeIds(15, 17));

        setLeElementText("fmaLeSubtotalA", subtotalA);
        setLeElementText("fmaLeSubtotalB", subtotalB);
        setLeElementText("fmaLeSubtotalC", subtotalC);

        setLeElementText("domainScoreLeA", subtotalA + " / 18");
        setLeElementText("domainScoreLeB", subtotalB + " / 10");
        setLeElementText("domainScoreLeC", subtotalC + " / 6");

    }


    /* ==========================================
    ACTUALIZAR BARRA DE PROGRESO
    ========================================== */

    function updateFMALEProgress() {

        const completed = countFMALECompleted();
        const progress = (completed / 17) * 100;

        setLeElementText("fmaLeProgressText", completed + " / 17");

        const progressBar =
            document.getElementById("fmaLeProgressBar");

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

    }


    /* ==========================================
    ACTUALIZAR RESULTADO FINAL
    ========================================== */

    function updateFMALEResult() {

    const total = calculateFMALETotal();
    const completed = countFMALECompleted();

    setLeElementText("fmaLeFinalScore", total);
    setLeElementText("fmaLeTotal", total);

    const percentageValue = (total / 34) * 100;

    setLeElementText(
        "fmaLePercentage",
        percentageValue.toFixed(1) + " %"
    );

    const message =
        document.getElementById("fmaLeResultMessage");

    if (message) {

        message.textContent =
            completed < 17
                ? "Se han registrado " + completed + " de 17 ítems."
                : "Evaluación FMA-LE completada. Puntuación total: " + total + " / 34.";

    }

    const completion =
        document.getElementById("fmaLeCompletionMessage");

    if (completion) {

        completion.textContent =
            completed < 17
                ? "Complete los " + (17 - completed) + " ítems restantes para obtener el resultado final."
                : "Evaluación completa. Revise el resultado antes de registrarlo en la historia clínica.";

    }

    updateFMALEInterpretation(total, completed);
}


/* ==========================================
   INTERPRETACIÓN CLÍNICA — FMA-LE
   ========================================== */

function updateFMALEInterpretation(total, completed) {

    const box =
        document.getElementById("fmaLeInterpretationBox");

    const label =
        document.getElementById("fmaLeInterpretationLabel");

    const description =
        document.getElementById("fmaLeInterpretationDescription");

    const mcidNote =
        document.getElementById("fmaLeMcidNote");

    if (!box || !label || !description) {
        return;
    }


    /* ------------------------------------------
       ESTADO INCOMPLETO
       ------------------------------------------ */

    if (completed < 17) {

        box.classList.remove(
            "fma-severe",
            "fma-moderate-severe",
            "fma-moderate",
            "fma-mild",
            "fma-conserved"
        );

        label.textContent =
            "Complete la evaluación para obtener la interpretación.";

        description.textContent =
            "Se han registrado " + completed + " de 17 ítems. " +
            "La interpretación clínica se mostrará al completar la evaluación.";

        if (mcidNote) {
            mcidNote.hidden = true;
        }

        return;
    }


    /* ------------------------------------------
       INTERPRETACIÓN SEGÚN PORCENTAJE
       ------------------------------------------ */

    const percentage = (total / 34) * 100;

    const interpretation =
        interpretFmaByPercentage(percentage);

    label.textContent =
        interpretation.label;

    description.textContent =
        interpretation.description;

    box.classList.remove(
        "fma-severe",
        "fma-moderate-severe",
        "fma-moderate",
        "fma-mild",
        "fma-conserved"
    );

    box.classList.add(interpretation.className);

    if (mcidNote) {
        mcidNote.hidden = false;
    }
}


    /* ==========================================
    ACTUALIZAR ESTADO VISUAL DE LOS BOTONES
    ========================================== */

    function updateFMALEScoreButtons() {

        document
            .querySelectorAll("#fmaLeCalculator .fma-item")
            .forEach(function (item) {

                const itemId = Number(item.dataset.item);
                const score = getFMALEScore(itemId);

                item
                    .querySelectorAll(".fma-score-button")
                    .forEach(function (button) {

                        const isSelected =
                            score !== null &&
                            Number(button.dataset.score) === score;

                        button.classList.toggle(
                            "selected",
                            isSelected
                        );

                    });

            });

    }


    /* ==========================================
    ACTUALIZAR TODA LA INTERFAZ
    ========================================== */

    function updateFMALEInterface() {

        updateFMALESubtotals();
        updateFMALEProgress();
        updateFMALEResult();
        updateFMALEScoreButtons();

    }


    /* ==========================================
    EVENTOS DE PUNTUACIÓN (DELEGACIÓN)
    ========================================== */

    function initFMALEScoreButtons() {

        const calculator =
            document.getElementById("fmaLeCalculator");

        if (!calculator) {
            return;
        }

        calculator.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(".fma-score-button");

                if (!button) {
                    return;
                }

                const item =
                    button.closest(".fma-item");

                if (!item) {
                    return;
                }

                const itemId = Number(item.dataset.item);
                const score = Number(button.dataset.score);

                setFMALEScore(itemId, score);

            }
        );

    }


    /* ==========================================
    REGISTRO DE TIEMPOS — ÍTEM 17
    (calcula y asigna automáticamente la
    puntuación del ítem 17 a partir de la
    diferencia de tiempos)
    ========================================== */

    function resetLeTimeInputs() {

        const unaffected =
            document.getElementById("fmaLeUnaffectedTime");

        const affected =
            document.getElementById("fmaLeAffectedTime");

        const result =
            document.getElementById("fmaLeTimeResult");

        if (unaffected) unaffected.value = "";
        if (affected) affected.value = "";

        if (result) {
            result.textContent =
                "Introduzca ambos tiempos para calcular el ítem 17.";
        }

    }


    function initFMALETiming() {

        const unaffected =
            document.getElementById("fmaLeUnaffectedTime");

        const affected =
            document.getElementById("fmaLeAffectedTime");

        const result =
            document.getElementById("fmaLeTimeResult");

        if (!unaffected || !affected || !result) {
            return;
        }

        function calculateLeTimeScore() {

            const unaffectedValue = parseFloat(unaffected.value);
            const affectedValue = parseFloat(affected.value);

            fmaLEState.unaffectedTime =
                Number.isFinite(unaffectedValue) ? unaffectedValue : null;

            fmaLEState.affectedTime =
                Number.isFinite(affectedValue) ? affectedValue : null;

            if (
                fmaLEState.unaffectedTime === null ||
                fmaLEState.affectedTime === null
            ) {

                result.textContent =
                    "Introduzca ambos tiempos para calcular el ítem 17.";

                return;

            }

            if (
                fmaLEState.unaffectedTime <= 0 ||
                fmaLEState.affectedTime <= 0
            ) {

                result.textContent =
                    "Los tiempos deben ser mayores que cero.";

                return;

            }

            const difference =
                fmaLEState.affectedTime - fmaLEState.unaffectedTime;

            let suggestedScore;

            if (difference < 2) {
                suggestedScore = 2;
            } else if (difference < 6) {
                suggestedScore = 1;
            } else {
                suggestedScore = 0;
            }

            result.textContent =
                "Diferencia: " + difference.toFixed(1) +
                " s · Puntuación asignada al ítem 17: " + suggestedScore + ".";

            setFMALEScore(17, suggestedScore);

        }

        unaffected.addEventListener("input", calculateLeTimeScore);
        affected.addEventListener("input", calculateLeTimeScore);

    }


    /* ==========================================
    REINICIAR EVALUACIÓN
    ========================================== */

    function resetFMALE() {

        fmaLEState.scores = {};
        fmaLEState.unaffectedTime = null;
        fmaLEState.affectedTime = null;

        resetLeTimeInputs();
        updateFMALEInterface();

    }


    function initFMALEReset() {

        const resetButton =
            document.getElementById("fmaLeReset");

        if (!resetButton) {
            return;
        }

        resetButton.addEventListener(
            "click",
            function () {

                const confirmed = window.confirm(
                    "¿Está seguro de que desea reiniciar toda la evaluación FMA-LE?"
                );

                if (!confirmed) {
                    return;
                }

                resetFMALE();

            }
        );

    }


    /* ==========================================
    INICIALIZACIÓN
    ========================================== */

    renderFMALEItems();
    initFMALEScoreButtons();
    initFMALETiming();
    initFMALEReset();
    updateFMALEInterface();

}
/* ==========================================================
   CALCULADORA FUNCTIONAL REACH TEST (FRT)
   ========================================================== */

const frtCalculator =
    document.getElementById("frtCalculator");

if (frtCalculator) {

    const frtAttempt1 =
        document.getElementById("frtAttempt1");

    const frtAttempt2 =
        document.getElementById("frtAttempt2");

    const frtAttempt3 =
        document.getElementById("frtAttempt3");

    const frtBaseline =
        document.getElementById("frtBaseline");

    const frtValidation =
        document.getElementById("frtValidation");

    const frtResults =
        document.getElementById("frtResults");

    const frtChangeRow =
        document.getElementById("frtChangeRow");

    const frtChangeDescription =
        document.getElementById("frtChangeDescription");

    const frtInterpretationBox =
        document.getElementById("frtInterpretationBox");

    const frtInterpretationLabel =
        document.getElementById("frtInterpretationLabel");

    const frtInterpretationDescription =
        document.getElementById("frtInterpretationDescription");

    const frtMcidNote =
    document.getElementById("frtMcidNote");

    /* ==========================================
    CONVERSIÓN DE DECIMALES
    ========================================== */

    function parseFrtDecimal(value) {

        const normalizedValue = value
            .trim()
            .replace(",", ".");

        if (!normalizedValue) {
            return null;
        }

        const parsedValue =
            Number(normalizedValue);

        return Number.isFinite(parsedValue)
            ? parsedValue
            : null;

    }


    /* ==========================================
    FORMATO DE RESULTADOS
    ========================================== */

    function formatFrtNumber(value) {

        return new Intl.NumberFormat("es-CO", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value);

    }


    function setFrtText(id, text) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = text;
    }

}
    /* ==========================================
    VALIDACIONES
    ========================================== */

    function showFrtValidation(message) {

        frtValidation.textContent =
            message;

        frtValidation.hidden =
            false;

        frtResults.hidden =
            true;
    if (frtMcidNote) {
        frtMcidNote.hidden = true;
    }
        frtValidation.focus();

    }


    function clearFrtValidation() {

        frtValidation.textContent =
            "";

        frtValidation.hidden =
            true;

    }


    /* ==========================================
    INTERPRETACIÓN CLÍNICA POR RANGOS
    (Duncan et al., 1990 — puntos de corte clásicos)
    ========================================== */

    function interpretFrtDistance(distance) {

        if (distance < 15) {

            return {
                label: "Riesgo de caídas notablemente aumentado",
                className: "frt-high-risk",
                description:
                    "Una distancia menor de 15 cm se ha " +
                    "asociado, en los estudios originales, " +
                    "con un riesgo de caídas notablemente " +
                    "mayor (aproximadamente 4 veces) respecto " +
                    "a distancias mayores."
            };

        }

        if (distance <= 25) {

            return {
                label: "Riesgo de caídas moderadamente aumentado",
                className: "frt-moderate-risk",
                description:
                    "Una distancia entre 15 y 25 cm suele " +
                    "asociarse con un riesgo de caídas " +
                    "moderadamente aumentado (aproximadamente " +
                    "2 veces) respecto a distancias mayores."
            };

        }

        return {
            label: "Riesgo de caídas comparativamente bajo",
            className: "frt-low-risk",
            description:
                "Una distancia mayor de 25 cm suele " +
                "asociarse con un riesgo de caídas " +
                "comparativamente menor en los estudios " +
                "originales de referencia."
        };

    }


    /* ==========================================
    CÁLCULO FRT
    ========================================== */

    frtCalculator.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const distance1 =
                parseFrtDecimal(
                    frtAttempt1.value
                );

            const distance2 =
                parseFrtDecimal(
                    frtAttempt2.value
                );

            const distance3 =
                parseFrtDecimal(
                    frtAttempt3.value
                );

            const baseline =
                parseFrtDecimal(
                    frtBaseline.value
                );


            /* ==========================================
            INTENTO 1 — OBLIGATORIO
            ========================================== */

            if (
                distance1 === null ||
                distance1 <= 0
            ) {

                showFrtValidation(
                    "Ingrese una distancia válida mayor que cero para el intento 1."
                );

                return;

            }


            /* ==========================================
            INTENTO 2 — OPCIONAL
            ========================================== */

            if (
                frtAttempt2.value.trim() &&
                (
                    distance2 === null ||
                    distance2 <= 0
                )
            ) {

                showFrtValidation(
                    "El intento 2 debe ser un valor válido mayor que cero o dejarse vacío."
                );

                return;

            }


            /* ==========================================
            INTENTO 3 — OPCIONAL
            ========================================== */

            if (
                frtAttempt3.value.trim() &&
                (
                    distance3 === null ||
                    distance3 <= 0
                )
            ) {

                showFrtValidation(
                    "El intento 3 debe ser un valor válido mayor que cero o dejarse vacío."
                );

                return;

            }


            /* ==========================================
            ALCANCE PREVIO — OPCIONAL
            ========================================== */

            if (
                frtBaseline.value.trim() &&
                (
                    baseline === null ||
                    baseline <= 0
                )
            ) {

                showFrtValidation(
                    "El alcance previo debe ser un valor válido mayor que cero o dejarse vacío."
                );

                return;

            }


            /* ==========================================
            DISTANCIAS REGISTRADAS
            ========================================== */

            const distances = [distance1];

            if (distance2 !== null) {
                distances.push(distance2);
            }

            if (distance3 !== null) {
                distances.push(distance3);
            }

            const averageDistance =
                distances.reduce(
                    function (sum, distance) {
                        return sum + distance;
                    },
                    0
                ) / distances.length;


            /* ==========================================
            DATOS DE REGISTRO
            ========================================== */

            setFrtText(
                "frtResultAttempt1",
                formatFrtNumber(distance1) + " cm"
            );

            setFrtText(
                "frtResultAttempt2",
                distance2 === null
                    ? "No registrado"
                    : formatFrtNumber(distance2) + " cm"
            );

            setFrtText(
                "frtResultAttempt3",
                distance3 === null
                    ? "No registrado"
                    : formatFrtNumber(distance3) + " cm"
            );

            setFrtText(
                "frtResultAverage",
                formatFrtNumber(averageDistance) + " cm"
            );

            setFrtText(
                "frtPrimaryResult",
                formatFrtNumber(averageDistance) + " cm"
            );

            setFrtText(
                "frtAttemptNote",
                distances.length === 1
                    ? "Resultado calculado con un solo intento."
                    : "Resultado calculado a partir de " + distances.length + " intentos."
            );


            /* ==========================================
            INTERPRETACIÓN CLÍNICA
            ========================================== */

            const interpretation =
                interpretFrtDistance(averageDistance);

            frtInterpretationLabel.textContent =
                interpretation.label;

            frtInterpretationDescription.textContent =
                interpretation.description;

            frtInterpretationBox.classList.remove(
                "frt-low-risk",
                "frt-moderate-risk",
                "frt-high-risk"
            );

            frtInterpretationBox.classList.add(
                interpretation.className
            );


            /* ==========================================
            CAMBIO ABSOLUTO
            (en FRT, mayor distancia = mejor desempeño)
            ========================================== */

            if (baseline === null) {

                frtChangeRow.hidden =
                    true;

                frtChangeDescription.textContent =
                    "";

            } else {

                const absoluteChange =
                    averageDistance - baseline;

                const changePrefix =
                    absoluteChange > 0
                        ? "+"
                        : "";

                let changeDescription = "";

                if (absoluteChange > 0) {

                    changeDescription =
                        "La distancia actual es mayor que la registrada previamente, lo que puede reflejar una mejoría en el desempeño.";

                } else if (absoluteChange < 0) {

                    changeDescription =
                        "La distancia actual es menor que la registrada previamente, lo que puede reflejar una disminución en el desempeño.";

                } else {

                    changeDescription =
                        "La distancia actual es igual a la registrada previamente.";

                }

                setFrtText(
                    "frtResultChange",
                    changePrefix +
                    formatFrtNumber(absoluteChange) +
                    " cm"
                );

                frtChangeDescription.textContent =
                    changeDescription;

                frtChangeRow.hidden =
                    false;

            }

                        /* ---------------------------------------------
               MOSTRAR MCID
               --------------------------------------------- */

            if (frtMcidNote) {
                frtMcidNote.hidden = false;
            }


            clearFrtValidation();

            frtResults.hidden =
                false;

        }
    );

}

/* ==========================================================
   NUEVAS CALCULADORAS CLÍNICAS Y HERRAMIENTAS INTERACTIVAS
   NeuroRehab - ACV, Lesión Medular, PC, SGB, Neuromusculares
   ========================================================== */

/* ==========================================================
   1. CALCULADORA NIHSS (ACV)
   11 ítems / 15 Componentes - 0 a 42 Puntos
   ========================================================== */
function initNihssCalculator() {
    const form = document.getElementById("nihssForm");
    if (!form) return;

    const resultPanel = document.getElementById("nihssResults");
    const scoreDisplay = document.getElementById("nihssTotalScore");
    const badgeDisplay = document.getElementById("nihssBadge");
    const interpDisplay = document.getElementById("nihssInterpretation");
    const mcidDisplay = document.getElementById("nihssMcidNote");
    const completedDisplay = document.getElementById("nihssCompletedCount");
    const resetBtn = document.getElementById("nihssReset");

    const itemNames = [
        "nihss_1a", "nihss_1b", "nihss_1c", "nihss_2", "nihss_3",
        "nihss_4", "nihss_5a", "nihss_5b", "nihss_6a", "nihss_6b",
        "nihss_7", "nihss_8", "nihss_9", "nihss_10", "nihss_11"
    ];

    function calculateNihss() {
        let total = 0;
        let answered = 0;

        itemNames.forEach(name => {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            if (checked) {
                answered++;
                const val = checked.value;
                if (val !== "UN") {
                    total += parseInt(val, 10) || 0;
                }
            }
        });

        if (completedDisplay) {
            completedDisplay.textContent = `${answered} de ${itemNames.length}`;
        }
        /* ---------------------------------------------
           OCULTAR MCID MIENTRAS SE COMPLETA
           --------------------------------------------- */

        if (mcidDisplay) {
            mcidDisplay.hidden = true;
        }
        if (scoreDisplay) {
            scoreDisplay.textContent = total;
        }

        // Stratification AHA / ASA
        let category = "";
        let badgeClass = "";
        let desc = "";

        if (total === 0) {
            category = "Sin déficit aparente";
            badgeClass = "calc-badge-green";
            desc = "Puntuación 0: No se aprecian déficits neurológicos medibles con la escala NIHSS. Requiere vigilancia clínica continuada según evolución.";
        } else if (total <= 4) {
            category = "Ictus leve";
            badgeClass = "calc-badge-yellow";
            desc = "Puntuación 1 a 4: Déficit neurológico leve. Frecuentemente candidato a rehabilitación ambulatoria o temprana con buen pronóstico funcional.";
        } else if (total <= 15) {
            category = "Ictus moderado";
            badgeClass = "calc-badge-orange";
            desc = "Puntuación 5 a 15: Afectación neurológica moderada. Se recomienda intervención intensiva y multidisciplinar en fase aguda y subaguda.";
        } else if (total <= 20) {
            category = "Ictus moderado a severo";
            badgeClass = "calc-badge-red";
            desc = "Puntuación 16 a 20: Déficit neurológico relevante con compromiso motor, sensorial o cognitivo-lingüístico importante. Alta necesidad de cuidados y rehabilitación hospitalaria.";
        } else {
            category = "Ictus severo";
            badgeClass = "calc-badge-red";
            desc = "Puntuación 21 a 42: Déficit neurológico severo. Alto riesgo de complicaciones agudas, disfagia y dependencia funcional. Requiere abordaje protector y prevención secundaria estricta.";
        }

        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badgeClass}`;
            badgeDisplay.textContent = category;
        }

        if (interpDisplay) {
            interpDisplay.textContent = desc;
        }
        /* ---------------------------------------------
           MOSTRAR MCID CUANDO LA EVALUACIÓN ESTÁ COMPLETA
           --------------------------------------------- */

        if (mcidDisplay && answered === itemNames.length) {
            mcidDisplay.hidden = false;
        }
        if (resultPanel) {
            resultPanel.hidden = false;
        }
    }

    form.addEventListener("change", calculateNihss);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            calculateNihss();
        });
    }

    calculateNihss();
}

/* ==========================================================
   2. ESCALA DE RANKIN MODIFICADA (mRS)
   0 a 6 Puntos
   ========================================================== */
function initMrsCalculator() {
    const form = document.getElementById("mrsForm");
    if (!form) return;

    const resultPanel = document.getElementById("mrsResults");
    const scoreDisplay = document.getElementById("mrsTotalScore");
    const badgeDisplay = document.getElementById("mrsBadge");
    const interpDisplay = document.getElementById("mrsInterpretation");
    const mrsMcidDisplay = document.getElementById("mrsMcidNote");
    const resetBtn = document.getElementById("mrsReset");

    const mRSData = {
        "0": { title: "Grado 0 - Asintomático", badge: "calc-badge-green", desc: "Sin síntomas en absoluto; recuperación funcional completa." },
        "1": { title: "Grado 1 - Discapacidad no significativa", badge: "calc-badge-green", desc: "Presenta algunos síntomas residuales, pero es capaz de llevar a cabo todos sus deberes y actividades habituales sin ayuda." },
        "2": { title: "Grado 2 - Discapacidad leve", badge: "calc-badge-yellow", desc: "Incapaz de realizar algunas actividades previas, pero plenamente independiente para las actividades básicas de la vida diaria y el autocuidado sin asistencia." },
        "3": { title: "Grado 3 - Discapacidad moderada", badge: "calc-badge-orange", desc: "Requiere cierta ayuda externa para actividades instrumentales, pero es capaz de caminar de forma autónoma sin asistencia física de otra persona." },
        "4": { title: "Grado 4 - Discapacidad moderadamente severa", badge: "calc-badge-red", desc: "Incapaz de caminar sin ayuda y de atender sus necesidades corporales básicas sin asistencia. Requiere apoyo continuo de un cuidador." },
        "5": { title: "Grado 5 - Discapacidad severa", badge: "calc-badge-red", desc: "Totalmente dependiente; confinado a la cama, incontinente y con necesidad de atención y cuidados de enfermería permanentes." },
        "6": { title: "Grado 6 - Fallecimiento", badge: "calc-badge-red", desc: "Muerte del paciente." }
    };

    function updateMrs() {
        const checked = form.querySelector('input[name="mrs_level"]:checked');
        if (!checked) return;

        const val = checked.value;
        const data = mRSData[val];

        if (scoreDisplay) scoreDisplay.textContent = val;
        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${data.badge}`;
            badgeDisplay.textContent = data.title;
        }
        if (interpDisplay) {
            const indepText = parseInt(val, 10) <= 2 ? "Categorizado como Resultado Favorable (Independencia Funcional)." : "Categorizado como Dependencia Funcional o Pronóstico Desfavorable.";
            interpDisplay.textContent = `${data.desc} ${indepText}`;
        }
                /* ---------------------------------------------
           MOSTRAR MCID
           --------------------------------------------- */

        if (mrsMcidDisplay) {
            mrsMcidDisplay.hidden = false;
        }
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", updateMrs);
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            const first = form.querySelector('input[name="mrs_level"]');
            if (first) first.checked = true;
            updateMrs();
        });
    }

    updateMrs();
}

/* ==========================================================
   3. CALCULADORA ASIA / AIS (LESIÓN MEDULAR)
   Algoritmo ISNCSCI 2019/2020: Grados A, B, C, D, E
   ========================================================== */
function initAsiaCalculator() {
    const form = document.getElementById("asiaForm");
    if (!form) return;

    const resultPanel = document.getElementById("asiaResults");
    const gradeDisplay = document.getElementById("asiaGrade");
    const badgeDisplay = document.getElementById("asiaBadge");
    const interpDisplay = document.getElementById("asiaInterpretation");
    const resetBtn = document.getElementById("asiaReset");

    function calculateAsia() {
        const vac = (form.querySelector('input[name="asia_vac"]:checked') || {}).value || "no";
        const dap = (form.querySelector('input[name="asia_dap"]:checked') || {}).value || "no";
        const sensoryS4S5 = (form.querySelector('input[name="asia_sensory"]:checked') || {}).value || "no";
        const nli = form.querySelector('#asiaNli') ? form.querySelector('#asiaNli').value : "Torácico";
        const motorBelow = (form.querySelector('input[name="asia_motor_below"]:checked') || {}).value || "none";
        const strengthProportion = (form.querySelector('input[name="asia_strength"]:checked') || {}).value || "none";

        const sacralSparing = (vac === "yes" || dap === "yes" || sensoryS4S5 === "yes");

        let grade = "A";
        let title = "AIS Grado A Completa";
        let badgeClass = "calc-badge-red";
        let desc = "";

        if (!sacralSparing) {
            grade = "A";
            title = "AIS Grado A Lesión Completa";
            badgeClass = "calc-badge-red";
            desc = "No existe preservación motora ni sensitiva en los segmentos sacros S4-S5 (sin contracción anal voluntaria ni sensibilidad anal profunda/superficial). Representa una lesión medular completa a nivel " + nli + ".";
        } else if (sacralSparing && vac === "no" && motorBelow === "none") {
            grade = "B";
            title = "AIS Grado B Incompleta Sensitiva";
            badgeClass = "calc-badge-yellow";
            desc = "Existe preservación de función sensitiva sacra (S4-S5), pero sin función motora sacra (VAC ausente) y sin preservación motora a más de tres niveles por debajo del nivel motor ipsilateral a nivel " + nli + ".";
        } else if (sacralSparing && (vac === "yes" || motorBelow !== "none")) {
            if (strengthProportion === "all_normal") {
                grade = "E";
                title = "AIS Grado E Normal";
                badgeClass = "calc-badge-green";
                desc = "Funciones sensitivas y motoras normales en todos los segmentos evaluados en una persona que presentó previamente déficit neurológico.";
            } else if (strengthProportion === "half_or_more") {
                grade = "D";
                title = "AIS Grado D Incompleta Motora";
                badgeClass = "calc-badge-green";
                desc = "Existe función motora preservada por debajo del NLI (" + nli + "), y al menos la mitad o más de los músculos clave tienen una graduación muscular de balance mayor o igual a 3 (escala MRC). Alto potencial de deambulación funcional.";
            } else {
                grade = "C";
                title = "AIS Grado C Incompleta Motora";
                badgeClass = "calc-badge-orange";
                desc = "Existe función motora preservada por debajo del NLI (" + nli + "), pero más de la mitad de los músculos clave tienen una graduación muscular menor a 3 (escala MRC). Requiere entrenamiento intensivo de fortalecimiento y transferencias.";
            }
        }

        if (gradeDisplay) gradeDisplay.textContent = grade;
        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badgeClass}`;
            badgeDisplay.textContent = title;
        }
        if (interpDisplay) interpDisplay.textContent = desc;
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", calculateAsia);
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            calculateAsia();
        });
    }

    calculateAsia();
}

/* ==========================================================
   4. SELECTOR MULTIDIMENSIONAL PARÁLISIS CEREBRAL
   GMFCS, MACS y EDACS (Niveles I a V)
   ========================================================== */
function initCerebralPalsySelectors() {
    const cpContainer = document.getElementById("cpSelectors");
    if (!cpContainer) return;

    const gmfcsDesc = {
        "I": "Camina sin restricciones en interiores y exteriores. Puede subir escaleras sin barandilla. Corre y salta pero con menor velocidad, coordinación o equilibrio.",
        "II": "Camina en la mayoría de entornos pero presenta limitaciones en superficies irregulares, pendientes o espacios concurridos. Sube escaleras apoyándose en la barandilla. Limitaciones mínimas para correr y saltar.",
        "III": "Camina utilizando productos de apoyo para la marcha de accionamiento manual (andador posterior o bastones) en interiores. Puede subir escaleras con barandilla bajo supervisión. Para distancias largas utiliza silla de ruedas.",
        "IV": "Automovilidad con limitaciones importantes; puede utilizar silla de ruedas motorizada o requiere ayuda física amplia para los desplazamientos. En el hogar puede lograr traslados cortos con apoyo.",
        "V": "Severa limitación en el control voluntario del movimiento y mantenimiento de la postura contra la gravedad. Transportado siempre en silla de ruedas adaptada con soporte postural cefálico y de tronco."
    };

    const macsDesc = {
        "I": "Manipula objetos fácil y exitosamente. Las limitaciones en destreza manual fina no interfieren en la independencia cotidiana.",
        "II": "Manipula la mayoría de los objetos cotidianos pero con calidad y/o velocidad de ejecución algo reducida. Puede buscar alternativas para realizar ciertas tareas.",
        "III": "Manipula objetos con dificultad; requiere ayuda para preparar o adaptar la actividad, o la realiza de forma lenta.",
        "IV": "Manipula un número limitado de objetos de fácil agarre en situaciones adaptadas. Requiere asistencia continua.",
        "V": "No manipula objetos y presenta una habilidad severamente limitada para realizar acciones motoras sencillas. Requiere asistencia total."
    };

    const edacsDesc = {
        "I": "Come y bebe con seguridad y eficiencia completa.",
        "II": "Come y bebe con seguridad pero con algunas limitaciones en la eficiencia (pérdida ocasional de alimento o mayor tiempo invertido).",
        "III": "Come y bebe con ciertas limitaciones en la seguridad (riesgo de atragantamiento ocasional con texturas difíciles); puede haber limitaciones de eficiencia.",
        "IV": "Come y bebe con limitaciones significativas en la seguridad (alto riesgo de aspiración recurrente). Requiere modificaciones estrictas de texturas y supervisión.",
        "V": "Incapaz de alimentarse o beber por vía oral de forma segura. Requiere alimentación enteral o gastrostomía."
    };

    function updateProfile() {
        const gmfcsRadio = cpContainer.querySelector('input[name="gmfcs_level"]:checked');
        const macsRadio = cpContainer.querySelector('input[name="macs_level"]:checked');
        const edacsRadio = cpContainer.querySelector('input[name="edacs_level"]:checked');

        const gVal = gmfcsRadio ? gmfcsRadio.value : "I";
        const mVal = macsRadio ? macsRadio.value : "I";
        const eVal = edacsRadio ? edacsRadio.value : "I";

        const gDescEl = document.getElementById("gmfcsDescText");
        const mDescEl = document.getElementById("macsDescText");
        const eDescEl = document.getElementById("edacsDescText");
        const summaryBadge = document.getElementById("cpSummaryBadge");
        const profileSummary = document.getElementById("cpProfileSummary");

        if (gDescEl) gDescEl.textContent = gmfcsDesc[gVal];
        if (mDescEl) mDescEl.textContent = macsDesc[mVal];
        if (eDescEl) eDescEl.textContent = edacsDesc[eVal];

        if (summaryBadge) {
            summaryBadge.textContent = `Perfil: GMFCS ${gVal} · MACS ${mVal} · EDACS ${eVal}`;
        }

        if (profileSummary) {
            profileSummary.textContent = `Paciente clasificado con función motora gruesa Nivel ${gVal}, destreza manual Nivel ${mVal} y función deglutoria-alimentaria Nivel ${eVal}. Orientar las metas funcionales de fisioterapia y terapia ocupacional conforme a este perfil funcional.`;
        }
    }

    cpContainer.addEventListener("change", updateProfile);
    updateProfile();
}

/* ==========================================================
   5. CALCULADORAS GUILLAIN-BARRÉ: HUGHES Y mEGOS
   ========================================================== */
function initHughesCalculator() {
    const form = document.getElementById("hughesForm");
    if (!form) return;

    const resultPanel = document.getElementById("hughesResults");
    const scoreDisplay = document.getElementById("hughesScore");
    const badgeDisplay = document.getElementById("hughesBadge");
    const interpDisplay = document.getElementById("hughesInterpretation");
    const hughesMcidDisplay =
    document.getElementById("hughesMcidNote");
    const resetBtn = document.getElementById("hughesReset");

    const hughesData = {
        "0": { title: "Grado 0 - Sano", badge: "calc-badge-green", desc: "Función neurológica normal; asintomático." },
        "1": { title: "Grado 1 - Síntomas menores", badge: "calc-badge-green", desc: "Síntomas y signos menores; capaz de correr y subir escaleras sin dificultad." },
        "2": { title: "Grado 2 - Marcha independiente", badge: "calc-badge-yellow", desc: "Capaz de caminar 10 metros o más en espacio abierto sin soporte físico ni ayuda de otra persona, pero incapaz de correr." },
        "3": { title: "Grado 3 - Marcha con asistencia", badge: "calc-badge-orange", desc: "Capaz de caminar 10 metros en espacio abierto pero requiere bastón, andador o apoyo físico de una persona." },
        "4": { title: "Grado 4 - Encamado o silla de ruedas", badge: "calc-badge-red", desc: "Confinado a cama o silla de ruedas; incapaz de recorrer 10 metros incluso con ayuda física." },
        "5": { title: "Grado 5 - Ventilación asistida", badge: "calc-badge-red", desc: "Requiere ventilación mecánica durante al menos parte del día o de la noche." },
        "6": { title: "Grado 6 - Muerte", badge: "calc-badge-red", desc: "Fallecimiento." }
    };

    function updateHughes() {
        const checked = form.querySelector('input[name="hughes_level"]:checked');
        if (!checked) return;

        const val = checked.value;
        const data = hughesData[val];

        if (scoreDisplay) scoreDisplay.textContent = val;
        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${data.badge}`;
            badgeDisplay.textContent = data.title;
        }
        if (interpDisplay) {
            interpDisplay.textContent = data.desc;
        }
                /* MOSTRAR MCID */

        if (hughesMcidDisplay) {
            hughesMcidDisplay.hidden = false;
        }
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", updateHughes);
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            const def = form.querySelector('input[name="hughes_level"][value="2"]');
            if (def) def.checked = true;
            updateHughes();
        });
    }

    updateHughes();
}

function initMegosCalculator() {
    const form = document.getElementById("megosForm");
    if (!form) return;

    const resultPanel = document.getElementById("megosResults");
    const scoreDisplay = document.getElementById("megosScore");
    const badgeDisplay = document.getElementById("megosBadge");
    const probDisplay = document.getElementById("megosProb");
    const interpDisplay = document.getElementById("megosInterpretation");
    const resetBtn = document.getElementById("megosReset");

    function calculateMegos() {
        const age = parseInt((form.querySelector('input[name="megos_age"]:checked') || {}).value || "0", 10);
        const diarrhea = parseInt((form.querySelector('input[name="megos_diarrhea"]:checked') || {}).value || "0", 10);
        const mrc = parseInt((form.querySelector('input[name="megos_mrc"]:checked') || {}).value || "0", 10);

        const total = age + diarrhea + mrc;

        let risk = "Riesgo Bajo";
        let badgeClass = "calc-badge-green";
        let prob = "";
        let desc = "";

        if (total <= 1) {
            risk = "Riesgo Bajo";
            badgeClass = "calc-badge-green";
            prob = "Probabilidad estimada de NO caminar de forma independiente a los 6 meses: ~1% a 5% (Excelente pronóstico funcional).";
            desc = "La gran mayoría de los pacientes (>95%) recuperará la deambulación independiente a los 6 meses. Fisioterapia enfocada en prevención de contracturas y reentrenamiento progresivo.";
        } else if (total <= 3) {
            risk = "Riesgo Intermedio";
            badgeClass = "calc-badge-yellow";
            prob = "Probabilidad estimada de NO caminar de forma independiente a los 6 meses: ~10% a 25%.";
            desc = "Buen pronóstico general, pero con necesidad de seguimiento riguroso de la fatiga y fortalecimiento submáximo guiado.";
        } else {
            risk = "Riesgo Alto";
            badgeClass = "calc-badge-red";
            prob = "Probabilidad estimada de NO caminar de forma independiente a los 6 meses: ~35% a 50% o superior.";
            desc = "Riesgo elevado de recuperación motora prolongada y estancia hospitalaria extendida. Alta vigilancia respiratoria y programa de rehabilitación neurofísica a largo plazo.";
        }

        if (scoreDisplay) scoreDisplay.textContent = total;
        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badgeClass}`;
            badgeDisplay.textContent = `${risk} (${total} / 6 pts)`;
        }
        if (probDisplay) probDisplay.textContent = prob;
        if (interpDisplay) interpDisplay.textContent = desc;
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", calculateMegos);
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            calculateMegos();
        });
    }

    calculateMegos();
}

/* ==========================================================
   6. CALCULADORA ALSFRS-R (ELA)
   12 Ítems / 4 Dominios - 0 a 48 Puntos
   ========================================================== */
function initAlsfrsCalculator() {
    const form = document.getElementById("alsfrsForm");
    if (!form) return;

    const resultPanel = document.getElementById("alsfrsResults");
    const scoreDisplay = document.getElementById("alsfrsTotalScore");
    const badgeDisplay = document.getElementById("alsfrsBadge");
    const bulbarDisplay = document.getElementById("alsfrsBulbar");
    const fineMotorDisplay = document.getElementById("alsfrsFineMotor");
    const grossMotorDisplay = document.getElementById("alsfrsGrossMotor");
    const respDisplay = document.getElementById("alsfrsResp");
    const interpDisplay = document.getElementById("alsfrsInterpretation");
    const alsfrsMcidDisplay =
    document.getElementById("alsfrsMcidNote");
    const resetBtn = document.getElementById("alsfrsReset");

    const bulbarItems = ["alsfrs_1", "alsfrs_2", "alsfrs_3"];
    const fineItems = ["alsfrs_4", "alsfrs_5", "alsfrs_6"];
    const grossItems = ["alsfrs_7", "alsfrs_8", "alsfrs_9"];
    const respItems = ["alsfrs_10", "alsfrs_11", "alsfrs_12"];

    function getSum(itemArray) {
        let sum = 0;
        itemArray.forEach(name => {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            if (checked) {
                sum += parseInt(checked.value, 10) || 0;
            } else {
                sum += 4; // Default to max score 4 if untouched for full baseline
            }
        });
        return sum;
    }

    function calculateAlsfrs() {
        const bulbar = getSum(bulbarItems);
        const fine = getSum(fineItems);
        const gross = getSum(grossItems);
        const resp = getSum(respItems);

        const total = bulbar + fine + gross + resp;

        if (bulbarDisplay) bulbarDisplay.textContent = `${bulbar} / 12`;
        if (fineMotorDisplay) fineMotorDisplay.textContent = `${fine} / 12`;
        if (grossMotorDisplay) grossMotorDisplay.textContent = `${gross} / 12`;
        if (respDisplay) respDisplay.textContent = `${resp} / 12`;
        if (scoreDisplay) scoreDisplay.textContent = total;

        let badge = "calc-badge-green";
        let status = "Función Global Conservada";
        let note = "Puntuación dentro de rangos funcionales altos. Mantener ejercicio aeróbico suave y pautas de conservación de energía.";

        if (total < 25) {
            badge = "calc-badge-red";
            status = "Afectación Severa";
            note = "Deterioro funcional avanzado. Priorizar adaptación postural, prevención de retracciones, asistencia para transferencias y cuidados respiratorios prioritarios.";
        } else if (total < 38) {
            badge = "calc-badge-orange";
            status = "Afectación Moderada";
            note = "Pérdida moderada de independencia. Se aconseja adaptación de productos de apoyo para la marcha y utensilios adaptados.";
        } else if (total < 46) {
            badge = "calc-badge-yellow";
            status = "Afectación Leve";
            note = "Déficits funcionales iniciales. Enfocar la intervención en mantenimiento motor sin sobrecarga ni fatiga extrema.";
        }

        if (resp < 10) {
            note += " ¡Alerta clínica!: Puntuación respiratoria reducida. Requiere evaluación médica y espirometría urgente para indicación de soporte ventilatorio no invasivo (BiPAP).";
        }

        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badge}`;
            badgeDisplay.textContent = status;
        }

        if (interpDisplay) {
            interpDisplay.textContent = note;
        }
        /* MOSTRAR MCID */

        if (alsfrsMcidDisplay) {
            alsfrsMcidDisplay.hidden = false;
        }
        
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", calculateAlsfrs);
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            calculateAlsfrs();
        });
    }

    calculateAlsfrs();
}

/* ==========================================================
   7. CALCULADORA MG-ADL (MIASTENIA GRAVIS)
   8 ítems - 0 a 24 Puntos
   ========================================================== */
function initMgAdlCalculator() {
    const form = document.getElementById("mgAdlForm");
    if (!form) return;

    const resultPanel = document.getElementById("mgAdlResults");
    const scoreDisplay = document.getElementById("mgAdlTotalScore");
    const badgeDisplay = document.getElementById("mgAdlBadge");
    const ocularDisplay = document.getElementById("mgAdlOcular");
    const bulbarDisplay = document.getElementById("mgAdlBulbar");
    const respDisplay = document.getElementById("mgAdlResp");
    const motorDisplay = document.getElementById("mgAdlMotor");
    const interpDisplay = document.getElementById("mgAdlInterpretation");
    const resetBtn = document.getElementById("mgAdlReset");

    const items = [
        "mgadl_1", "mgadl_2", "mgadl_3", "mgadl_4",
        "mgadl_5", "mgadl_6", "mgadl_7", "mgadl_8"
    ];

    function calculateMgAdl() {
        let total = 0;
        items.forEach(name => {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            if (checked) {
                total += parseInt(checked.value, 10) || 0;
            }
        });

        const ocular = (parseInt((form.querySelector('input[name="mgadl_7"]:checked') || {}).value || "0", 10)) +
                       (parseInt((form.querySelector('input[name="mgadl_8"]:checked') || {}).value || "0", 10));

        const bulbar = (parseInt((form.querySelector('input[name="mgadl_1"]:checked') || {}).value || "0", 10)) +
                       (parseInt((form.querySelector('input[name="mgadl_2"]:checked') || {}).value || "0", 10)) +
                       (parseInt((form.querySelector('input[name="mgadl_3"]:checked') || {}).value || "0", 10));

        const resp = parseInt((form.querySelector('input[name="mgadl_4"]:checked') || {}).value || "0", 10);

        const motor = (parseInt((form.querySelector('input[name="mgadl_5"]:checked') || {}).value || "0", 10)) +
                      (parseInt((form.querySelector('input[name="mgadl_6"]:checked') || {}).value || "0", 10));

        if (ocularDisplay) ocularDisplay.textContent = `${ocular} / 6`;
        if (bulbarDisplay) bulbarDisplay.textContent = `${bulbar} / 9`;
        if (respDisplay) respDisplay.textContent = `${resp} / 3`;
        if (motorDisplay) motorDisplay.textContent = `${motor} / 6`;
        if (scoreDisplay) scoreDisplay.textContent = total;

        let badge = "calc-badge-green";
        let status = "Síntomas Mínimos / Controlados";
        let desc = "Puntuación baja (0 a 4 puntos). Poca repercusión sobre las actividades cotidianas. Programar ejercicio en horas de menor fatiga (mañanas o tras medicación).";

        if (total >= 15) {
            badge = "calc-badge-red";
            status = "Afectación Severa";
            desc = "Puntuación muy elevada (>14 puntos). Riesgo de crisis miasténica si existe debilidad bulbar o respiratoria. Evitar sobreesfuerzos físicos y contactar de inmediato con neurología.";
        } else if (total >= 9) {
            badge = "calc-badge-orange";
            status = "Afectación Moderada";
            desc = "Puntuación moderada (9 a 14 puntos). Repercusión ostensible en deglución, habla o movilidad. Planificar descansos frecuentes durante las sesiones.";
        } else if (total >= 5) {
            badge = "calc-badge-yellow";
            status = "Afectación Leve";
            desc = "Puntuación leve (5 a 8 puntos). Síntomas perceptibles que limitan parcialmente tareas repetitivas.";
        }

        if (resp > 0) {
            desc += " Atención: Puntuación respiratoria presente (>0). Monitorizar mecánica diafragmática y saturación de oxígeno.";
        }

        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badge}`;
            badgeDisplay.textContent = status;
        }

        if (interpDisplay) {
            interpDisplay.textContent = desc;
        }

        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", calculateMgAdl);
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            calculateMgAdl();
        });
    }

    calculateMgAdl();
}

/* ==========================================================
   8. CALCULADORA GLASGOW COMA SCALE (GCS)
   3 componentes, 3 a 15 puntos
   ========================================================== */
function initGcsCalculator() {
    const form = document.getElementById("gcsForm");
    if (!form) return;

    const resultPanel = document.getElementById("gcsResults");
    const scoreDisplay = document.getElementById("gcsScore");
    const badgeDisplay = document.getElementById("gcsBadge");
    const interpDisplay = document.getElementById("gcsInterpretation");
    const resetBtn = document.getElementById("gcsReset");

    function calculateGcs() {
        const eye = form.querySelector('input[name="gcs_eye"]:checked');
        const verbal = form.querySelector('input[name="gcs_verbal"]:checked');
        const motor = form.querySelector('input[name="gcs_motor"]:checked');

        if (!eye || !verbal || !motor) {
            if (badgeDisplay) {
                badgeDisplay.className = "calc-badge calc-badge-red";
                badgeDisplay.textContent = "Seleccione todos los componentes";
            }
            if (scoreDisplay) scoreDisplay.textContent = "—";
            if (interpDisplay) {
                interpDisplay.textContent =
                    "Complete los tres componentes para obtener la clasificación.";
            }
            if (resultPanel) resultPanel.hidden = false;
            return;
        }

        const eyeVal = parseInt(eye.value, 10);
        const motorVal = parseInt(motor.value, 10);
        const verbalVal = verbal.value === "T" ? null : parseInt(verbal.value, 10);

        let total = eyeVal + motorVal;
        if (verbalVal !== null) {
            total += verbalVal;
        }

        if (scoreDisplay) {
            scoreDisplay.textContent = verbalVal === null ? total + " (T)" : total;
        }

        // Stratification
        let category = "";
        let badgeClass = "";
        let desc = "";

        if (verbalVal === null) {
            category = "Intubado (T)";
            badgeClass = "calc-badge-orange";
            desc = "Paciente intubado. La respuesta verbal se registra como T y no se incluye en el total. Considere únicamente los componentes ocular y motor para la interpretación.";
        } else if (total >= 13) {
            category = "TCE leve (GCS 13-15)";
            badgeClass = "calc-badge-green";
            desc = "Puntuación compatible con TCE leve. Generalmente asociado a conmoción o contusión menor. Requiere observación clínica y vigilancia de signos de deterioro.";
        } else if (total >= 9) {
            category = "TCE moderado (GCS 9-12)";
            badgeClass = "calc-badge-yellow";
            desc = "Puntuación compatible con TCE moderado. Requiere observación hospitalaria y monitorización neurológica estrecha por riesgo de deterioro secundario.";
        } else {
            category = "TCE grave (GCS 3-8)";
            badgeClass = "calc-badge-red";
            desc = "Puntuación compatible con TCE grave. Requiere manejo en unidad de cuidados intensivos, control de la presión intracraneal y monitorización neurológica continua.";
        }

        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badgeClass}`;
            badgeDisplay.textContent = category;
        }
        if (interpDisplay) interpDisplay.textContent = desc;
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", calculateGcs);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            if (badgeDisplay) {
                badgeDisplay.className = "calc-badge calc-badge-red";
                badgeDisplay.textContent = "Seleccione todos los componentes";
            }
            if (scoreDisplay) scoreDisplay.textContent = "—";
            if (interpDisplay) {
                interpDisplay.textContent =
                    "Complete los tres componentes para obtener la clasificación.";
            }
        });
    }

    calculateGcs();
}


/* ==========================================================
   9. ESCALA RANCHO LOS AMIGOS
   8 niveles de funcionamiento cognitivo
   ========================================================== */
function initRanchoCalculator() {
    const form = document.getElementById("ranchoForm");
    if (!form) return;

    const resultPanel = document.getElementById("ranchoResults");
    const scoreDisplay = document.getElementById("ranchoScore");
    const badgeDisplay = document.getElementById("ranchoBadge");
    const interpDisplay = document.getElementById("ranchoInterpretation");
    const resetBtn = document.getElementById("ranchoReset");

    const ranchoData = {
        "I": {
            title: "Nivel I — Sin respuesta",
            desc: "El paciente no responde a ningún estímulo (visual, auditivo, táctil o doloroso). Requiere cuidados de enfermería totales y prevención de complicaciones del encamamiento prolongado."
        },
        "II": {
            title: "Nivel II — Respuesta generalizada",
            desc: "Respuesta inespecífica y no intencionada a los estímulos. Puede presentar movimientos reflejos o cambios autonómicos. La fisioterapia se centra en movilizaciones pasivas y cambios posturales."
        },
        "III": {
            title: "Nivel III — Respuesta localizada",
            desc: "El paciente responde de forma específica a los estímulos (giro de la cabeza, seguimiento visual, retirada del dolor). Se inician estrategias de sedestación asistida y estimulación sensorial controlada."
        },
        "IV": {
            title: "Nivel IV — Confuso y agitado",
            desc: "Paciente desorientado, con atención muy reducida y comportamiento agitado o agresivo. La fisioterapia debe ser breve, estructurada y en entorno tranquilo, priorizando seguridad y prevención de caídas."
        },
        "V": {
            title: "Nivel V — Confuso, inapropiado, no agitado",
            desc: "El paciente responde con mayor consistencia a estímulos simples, pero sigue desorientado y puede presentar respuestas verbales inapropiadas. Se avanza en la bipedestación y el entrenamiento funcional básico con supervisión constante."
        },
        "VI": {
            title: "Nivel VI — Confuso pero apropiado",
            desc: "Presenta orientación variable pero responde de forma apropiada a instrucciones simples. La fisioterapia puede orientarse a la marcha, transferencias y actividades funcionales con supervisión decreciente."
        },
        "VII": {
            title: "Nivel VII — Automático y apropiado",
            desc: "El paciente se comporta de forma apropiada en entornos familiares, aunque persiste alguna dificultad en situaciones nuevas. Puede retomar actividades de la vida diaria y entrenamiento funcional comunitario."
        },
        "VIII": {
            title: "Nivel VIII — Propósito y apropiado",
            desc: "El paciente es independiente en la mayoría de las actividades, con capacidad de juicio y aprendizaje. Puede orientarse hacia la reintegración laboral, deportiva y social, con seguimiento periódico."
        }
    };

    function updateRancho() {
        const checked = form.querySelector('input[name="rancho_level"]:checked');

        if (!checked) {
            if (badgeDisplay) {
                badgeDisplay.className = "calc-badge calc-badge-blue";
                badgeDisplay.textContent = "Seleccione un nivel";
            }
            if (scoreDisplay) scoreDisplay.textContent = "—";
            if (interpDisplay) {
                interpDisplay.textContent =
                    "Seleccione un nivel para ver su descripción e implicaciones para la fisioterapia.";
            }
            return;
        }

        const val = checked.value;
        const data = ranchoData[val];

        if (scoreDisplay) scoreDisplay.textContent = val;
        if (badgeDisplay) {
            badgeDisplay.className = "calc-badge calc-badge-blue";
            badgeDisplay.textContent = data.title;
        }
        if (interpDisplay) interpDisplay.textContent = data.desc;
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", updateRancho);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            updateRancho();
        });
    }

    updateRancho();
}

/* ==========================================================
   10. CALCULADORA MDS-UPDRS SIMPLIFICADA
   4 partes (I, II, III, IV)
   ========================================================== */
function initMdsUpdrsCalculator() {
    const form = document.getElementById("mdsUpdrsForm");
    if (!form) return;

    const resultPanel = document.getElementById("mdsUpdrsResults");
    const scoreDisplay = document.getElementById("mdsUpdrsScore");
    const badgeDisplay = document.getElementById("mdsUpdrsBadge");
    const interpDisplay = document.getElementById("mdsUpdrsInterpretation");
    const mdsUpdrsMcidDisplay =
    document.getElementById("mdsUpdrsMcidNote");
    const resetBtn = document.getElementById("mdsUpdrsReset");

    function calculateMdsUpdrs() {
        const part1 = form.querySelector('input[name="mds_part1"]:checked');
        const part2 = form.querySelector('input[name="mds_part2"]:checked');
        const part3 = form.querySelector('input[name="mds_part3"]:checked');
        const part4 = form.querySelector('input[name="mds_part4"]:checked');

        const answered = [part1, part2, part3, part4].filter(Boolean).length;

        if (answered < 4) {
            if (badgeDisplay) {
                badgeDisplay.className = "calc-badge calc-badge-green";
                badgeDisplay.textContent = "Seleccione todas las partes";
            }
            if (scoreDisplay) scoreDisplay.textContent = answered + " / 4";
            if (interpDisplay) {
                interpDisplay.textContent =
                    "Complete las 4 partes para obtener el perfil de afectación.";
            }
            if (mdsUpdrsMcidDisplay) {
                mdsUpdrsMcidDisplay.hidden = true;
            }
            if (resultPanel) resultPanel.hidden = false;
            return;
        }

        const p1 = parseInt(part1.value, 10);
        const p2 = parseInt(part2.value, 10);
        const p3 = parseInt(part3.value, 10);
        const p4 = parseInt(part4.value, 10);

        const total = p1 + p2 + p3 + p4;

        if (scoreDisplay) scoreDisplay.textContent = total;

        let category = "";
        let badgeClass = "";
        let desc = "";

        if (total <= 2) {
            category = "Afectación leve";
            badgeClass = "calc-badge-green";
            desc = "Perfil compatible con afectación leve. La fisioterapia debe centrarse en mantener la función, el ejercicio aeróbico y el entrenamiento de fuerza y equilibrio.";
        } else if (total <= 6) {
            category = "Afectación moderada";
            badgeClass = "calc-badge-yellow";
            desc = "Perfil compatible con afectación moderada. Se recomienda intensificar el entrenamiento de equilibrio, marcha y tareas funcionales, con atención al riesgo de caídas.";
        } else {
            category = "Afectación severa";
            badgeClass = "calc-badge-red";
            desc = "Perfil compatible con afectación severa. Priorizar la seguridad, la prevención de caídas, el mantenimiento de la movilidad y el abordaje de síntomas no motores.";
        }

        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badgeClass}`;
            badgeDisplay.textContent = category;
        }
        if (interpDisplay) interpDisplay.textContent = desc;
                if (mdsUpdrsMcidDisplay) {
            mdsUpdrsMcidDisplay.hidden = false;
        }
        if (resultPanel) resultPanel.hidden = false;
    }

    form.addEventListener("change", calculateMdsUpdrs);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            calculateMdsUpdrs();
        });
    }

    calculateMdsUpdrs();
}


/* ==========================================================
   11. CALCULADORA 5-TIMES SIT-TO-STAND (5-TSTS)
   Prueba funcional para enfermedad de Parkinson
   ========================================================== */
function initFstsCalculator() {
    const form = document.getElementById("fstsForm");
    if (!form) return;

    const attempt1 = document.getElementById("fstsAttempt1");
    const attempt2 = document.getElementById("fstsAttempt2");
    const validation = document.getElementById("fstsValidation");
    const results = document.getElementById("fstsResults");
    const resultAttempt1 = document.getElementById("fstsResultAttempt1");
    const resultAttempt2 = document.getElementById("fstsResultAttempt2");
    const resultAverage = document.getElementById("fstsResultAverage");
    const primaryResult = document.getElementById("fstsPrimaryResult");
    const attemptNote = document.getElementById("fstsAttemptNote");
    const interpretationLabel = document.getElementById("fstsInterpretationLabel");
    const interpretationDescription = document.getElementById("fstsInterpretationDescription");
    const interpretationBox = document.getElementById("fstsInterpretationBox");
    const fstsMcidNote = document.getElementById("fstsMcidNote");

    function parseDecimal(value) {
        const normalized = value.trim().replace(",", ".");
        if (!normalized) return null;
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : null;
    }

    function formatNumber(value) {
        return new Intl.NumberFormat("es-CO", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value);
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const time1 = parseDecimal(attempt1.value);
        const time2 = parseDecimal(attempt2.value);

        if (time1 === null || time1 <= 0) {
            validation.textContent = "Ingrese un tiempo válido mayor que cero para el intento 1.";
            validation.hidden = false;
            results.hidden = true;
             if (fstsMcidNote) {
                fstsMcidNote.hidden = true;
            }
            validation.focus();
            return;
        }

        if (attempt2.value.trim() && (time2 === null || time2 <= 0)) {
            validation.textContent = "El intento 2 debe ser un tiempo válido mayor que cero o dejarse vacío.";
            validation.hidden = false;
            results.hidden = true;
            if (fstsMcidNote) {
                fstsMcidNote.hidden = true;
            }
            validation.focus();
            return;
        }

        validation.hidden = true;

        const times = time2 === null ? [time1] : [time1, time2];
        const average = times.reduce((sum, t) => sum + t, 0) / times.length;

        setText("fstsResultAttempt1", formatNumber(time1) + " s");
        setText("fstsResultAttempt2", time2 === null ? "No registrado" : formatNumber(time2) + " s");
        setText("fstsResultAverage", formatNumber(average) + " s");
        setText("fstsPrimaryResult", formatNumber(average) + " s");
        setText("fstsAttemptNote", times.length === 1 ? "Resultado calculado con un solo intento." : "Resultado calculado a partir de dos intentos.");

        let label = "";
        let desc = "";
        let className = "";

        if (average <= 11.4) {
            label = "Desempeño dentro de rangos esperados";
            desc = "Tiempo dentro de valores de referencia para adultos de 60-69 años. Sin embargo, interprete junto con otros hallazgos clínicos.";
            className = "fsts-low-risk";
        } else if (average <= 14.8) {
            label = "Desempeño ligeramente reducido";
            desc = "Tiempo dentro de rangos de referencia para adultos mayores de 70-89 años. Considere entrenamiento de fuerza y transferencias.";
            className = "fsts-moderate-risk";
        } else if (average <= 16) {
            label = "Desempeño reducido";
            desc = "Tiempo superior a normas para adultos mayores. Se recomienda valorar fuerza de miembros inferiores, equilibrio y riesgo de caídas.";
            className = "fsts-moderate-risk";
        } else {
            label = "Riesgo elevado de caídas";
            desc = "En enfermedad de Parkinson, un tiempo superior a 16 segundos se asocia con riesgo elevado de caídas. Priorizar entrenamiento de fuerza, equilibrio y transferencias.";
            className = "fsts-high-risk";
        }

        interpretationLabel.textContent = label;
        interpretationDescription.textContent = desc;

        interpretationBox.classList.remove(
            "fsts-low-risk",
            "fsts-moderate-risk",
            "fsts-high-risk"
        );
        interpretationBox.classList.add(className);
        /* MOSTRAR MCID */

        if (fstsMcidNote) {
            fstsMcidNote.hidden = false;
        }

        results.hidden = false;
    });
}

/* ==========================================================
   12. CALCULADORA PDMS-2 SIMPLIFICADA
   Herramienta orientativa de desarrollo motor
   ========================================================== */
function initPdms2Calculator() {
    const form = document.getElementById("pdms2Form");
    if (!form) return;

    const milestonesContainer = document.getElementById("pdms2Milestones");
    const resultsPanel = document.getElementById("pdms2Results");
    const scoreDisplay = document.getElementById("pdms2Score");
    const scoreLabel = document.getElementById("pdms2ScoreLabel");
    const badgeDisplay = document.getElementById("pdms2Badge");
    const interpDisplay = document.getElementById("pdms2Interpretation");
    const resetBtn = document.getElementById("pdms2Reset");

    // Hitos esperados por rango de edad
    const milestonesByAge = {
        "1": [
            "Sostiene la cabeza erguida en prono",
            "Sigue objetos con la mirada",
            "Abre y cierra las manos",
            "Eleva la cabeza en supino",
            "Patalea con ambas piernas"
        ],
        "2": [
            "Se mantiene sentado con apoyo",
            "Se gira de prono a supino y viceversa",
            "Inicia la reptación",
            "Transfiere objetos entre manos",
            "Se lleva objetos a la boca"
        ],
        "3": [
            "Se sienta sin apoyo",
            "Se pone de pie con ayuda",
            "Da pasos laterales sostenido",
            "Hace pinza con índice y pulgar",
            "Manipula objetos pequeños"
        ],
        "4": [
            "Camina de forma independiente",
            "Sube escaleras con apoyo",
            "Lanza una pelota",
            "Come con cuchara con ayuda",
            "Se agacha para recoger objetos"
        ],
        "5": [
            "Corre con coordinación",
            "Salta en el lugar",
            "Pedalea un triciclo",
            "Baja escaleras alternando pies",
            "Se viste con supervisión"
        ],
        "6": [
            "Se mantiene en un pie brevemente",
            "Salta con los dos pies juntos",
            "Lanza y atrapa una pelota",
            "Se viste solo",
            "Utiliza tijeras con supervisión"
        ],
        "7": [
            "Salta alternando los pies",
            "Camina en línea recta",
            "Realiza coordinación fina avanzada",
            "Se ata los cordones",
            "Participa en juegos motores complejos"
        ]
    };

    let currentAge = null;

    function renderMilestones(age) {
        const milestones = milestonesByAge[age] || [];
        milestonesContainer.innerHTML = milestones.map((milestone, index) => `
            <label class="pdms2-milestone">
                <input type="checkbox" data-index="${index}">
                <span>${milestone}</span>
            </label>
        `).join("");
    }

    function calculatePdms2() {
        if (!currentAge) {
            if (badgeDisplay) {
                badgeDisplay.className = "calc-badge calc-badge-blue";
                badgeDisplay.textContent = "Seleccione la edad";
            }
            if (scoreDisplay) scoreDisplay.textContent = "—";
            if (scoreLabel) scoreLabel.textContent = "de hitos alcanzados";
            if (interpDisplay) {
                interpDisplay.textContent =
                    "Seleccione la edad y marque los hitos alcanzados para obtener una orientación.";
            }
            return;
        }

        const checkboxes = milestonesContainer.querySelectorAll('input[type="checkbox"]');
        const total = checkboxes.length;
        const achieved = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = total > 0 ? Math.round((achieved / total) * 100) : 0;

        if (scoreDisplay) scoreDisplay.textContent = `${achieved} / ${total}`;
        if (scoreLabel) scoreLabel.textContent = `(${percentage}% de hitos alcanzados)`;

        let category = "";
        let badgeClass = "";
        let desc = "";

        if (percentage >= 80) {
            category = "Desarrollo motor acorde a la edad";
            badgeClass = "calc-badge-green";
            desc = "El niño/a alcanza la mayoría de los hitos motores esperados para su rango de edad. Continuar con estimulación y seguimiento periódico.";
        } else if (percentage >= 60) {
            category = "Leve retraso motor";
            badgeClass = "calc-badge-yellow";
            desc = "El niño/a alcanza una parte importante de los hitos, pero persisten algunos déficits. Se recomienda reforzar la estimulación y reevaluar en 3 meses.";
        } else if (percentage >= 40) {
            category = "Retraso motor moderado";
            badgeClass = "calc-badge-orange";
            desc = "El niño/a presenta un retraso motor moderado. Se recomienda intervención fisioterapéutica específica y reevaluación con PDMS-2 completa.";
        } else {
            category = "Retraso motor significativo";
            badgeClass = "calc-badge-red";
            desc = "El niño/a presenta un retraso motor significativo. Se recomienda intervención fisioterapéutica intensiva y evaluación multidisciplinaria.";
        }

        if (badgeDisplay) {
            badgeDisplay.className = `calc-badge ${badgeClass}`;
            badgeDisplay.textContent = category;
        }
        if (interpDisplay) {
            interpDisplay.textContent = desc + " Esta herramienta es orientativa y no sustituye la administración completa de la PDMS-2 por un profesional certificado.";
        }
        if (resultsPanel) resultsPanel.hidden = false;
    }

    // Cambio de edad: carga los hitos correspondientes
    form.addEventListener("change", function (event) {
        if (event.target.name === "pdms2_age") {
            currentAge = event.target.value;
            renderMilestones(currentAge);
            calculatePdms2();
        } else if (event.target.type === "checkbox") {
            calculatePdms2();
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            currentAge = null;
            milestonesContainer.innerHTML = `
                <p class="calc-item-desc">
                    Primero seleccione la edad para ver los hitos esperados.
                </p>
            `;
            if (badgeDisplay) {
                badgeDisplay.className = "calc-badge calc-badge-blue";
                badgeDisplay.textContent = "Seleccione la edad y los hitos";
            }
            if (scoreDisplay) scoreDisplay.textContent = "—";
            if (scoreLabel) scoreLabel.textContent = "de hitos alcanzados";
            if (interpDisplay) {
                interpDisplay.textContent =
                    "Seleccione la edad y marque los hitos alcanzados para obtener una orientación.";
            }
        });
    }
}
/* ==========================================================
   INICIALIZACIÓN DE CALCULADORAS
   ========================================================== */

function initAllCalculators() {
    initNihssCalculator();
    initMrsCalculator();
    initAsiaCalculator();
    initCerebralPalsySelectors();
    initHughesCalculator();
    initMegosCalculator();
    initAlsfrsCalculator();
    initMgAdlCalculator();
    initGcsCalculator();
    initRanchoCalculator();
    initMdsUpdrsCalculator();
    initFstsCalculator();
    initPdms2Calculator();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllCalculators);
} else {
    initAllCalculators();
}

/* ==========================================================
   BOTÓN VOLVER ARRIBA
   ========================================================== */

(function () {

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) {
        return;
    }

    function toggleScrollTopButton() {

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }

    }

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener(
        "scroll",
        toggleScrollTopButton,
        { passive: true }
    );

    toggleScrollTopButton();

})();

/* ==========================================================
   ACCIONES DE RESULTADOS (COPIAR / IMPRIMIR)
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------------------
       COPIAR RESULTADOS
       ------------------------------------------ */

    document.querySelectorAll(".calc-copy-btn").forEach(function (button) {

        button.addEventListener("click", async function () {

            const targetId = button.getAttribute("data-target");
            const target = document.getElementById(targetId);

            if (!target) {
                return;
            }

            const text = target.innerText.trim();

            try {

                await navigator.clipboard.writeText(text);

                const originalHTML = button.innerHTML;

                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    ¡Copiado!
                `;

                button.disabled = true;

                setTimeout(function () {
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                }, 2000);

            } catch (err) {

                alert("No se pudo copiar. Tu navegador no lo permite.");

            }

        });

    });


        /* ------------------------------------------
       IMPRIMIR RESULTADOS
       ------------------------------------------ */

    document.querySelectorAll(".calc-print-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            /* 1. Obtener el panel de resultados objetivo */
            const targetId = button.getAttribute("data-target");
            const target = document.getElementById(targetId);

            if (!target) {
                return;
            }

            /* 2. Guardar el padre original del panel */
            const originalParent = target.parentNode;
            const originalNextSibling = target.nextSibling;

            /* 3. Guardar el scroll actual */
            const scrollY = window.scrollY;

            /* 4. Mover el panel directamente al body */
            document.body.appendChild(target);

            /* 5. Añadir clase al body para activar el modo impresión */
            document.body.classList.add("printing-mode");

            /* 6. Imprimir */
            window.print();

            /* 7. Restaurar después de imprimir */
            setTimeout(function () {

                /* Quitar la clase */
                document.body.classList.remove("printing-mode");

                /* Devolver el panel a su lugar original */
                if (originalNextSibling) {
                    originalParent.insertBefore(target, originalNextSibling);
                } else {
                    originalParent.appendChild(target);
                }

                /* Restaurar el scroll */
                window.scrollTo(0, scrollY);

            }, 300);

        });

    });

});
/* ==========================================================
   CALCULADORA ESCALA DE TINETTI (POMA)
   ========================================================== */

const tinettiCalculator = document.getElementById("tinettiForm");

if (tinettiCalculator) {

    const tinettiBalance = document.querySelectorAll('input[name="tinetti_balance"]');
    const tinettiGait = document.querySelectorAll('input[name="tinetti_gait"]');
    const tinettiResults = document.getElementById("tinettiResults");
    const tinettiBadge = document.getElementById("tinettiBadge");
    const tinettiScore = document.getElementById("tinettiScore");
    const tinettiInterpretationBox = document.getElementById("tinettiInterpretationBox");
    const tinettiInterpretationLabel = document.getElementById("tinettiInterpretationLabel");
    const tinettiInterpretationDescription = document.getElementById("tinettiInterpretationDescription");
    const tinettiMcidNote = document.getElementById("tinettiMcidNote");
    const tinettiReset = document.getElementById("tinettiReset");

    function calculateTinetti() {
        const balanceChecked = document.querySelector('input[name="tinetti_balance"]:checked');
        const gaitChecked = document.querySelector('input[name="tinetti_gait"]:checked');

        if (!balanceChecked || !gaitChecked) {
            tinettiBadge.className = "calc-badge calc-badge-blue";
            tinettiBadge.textContent = "Seleccione todas las opciones";
            tinettiScore.textContent = "—";
            tinettiInterpretationLabel.textContent = "Complete la evaluación para obtener la interpretación.";
            tinettiInterpretationDescription.textContent = "La interpretación aparecerá al completar los ítems.";
            tinettiMcidNote.hidden = true;
            tinettiResults.hidden = false;
            return;
        }

        const balanceScore = parseInt(balanceChecked.value, 10);
        const gaitScore = parseInt(gaitChecked.value, 10);
        const total = balanceScore + gaitScore;

        tinettiScore.textContent = total;

        let label, className, description;

        if (total < 19) {
            label = "Alto riesgo de caídas";
            className = "tinetti-high-risk";
            description = "La puntuación indica un alto riesgo de caídas. Se recomienda intervención fisioterapéutica intensiva centrada en el equilibrio, la fuerza y el entrenamiento de la marcha, así como educación sobre prevención de caídas en el hogar.";
        } else if (total <= 24) {
            label = "Riesgo moderado de caídas";
            className = "tinetti-moderate-risk";
            description = "La puntuación sugiere un riesgo moderado de caídas. Es recomendable un programa de ejercicio multicomponente que incluya equilibrio, fuerza y marcha, con seguimiento periódico.";
        } else {
            label = "Bajo riesgo de caídas";
            className = "tinetti-low-risk";
            description = "La puntuación indica un bajo riesgo de caídas. Se recomienda mantener la actividad física regular y el entrenamiento de fuerza y equilibrio para preservar la funcionalidad.";
        }

        tinettiBadge.className = `calc-badge ${className === 'tinetti-high-risk' ? 'calc-badge-red' : className === 'tinetti-moderate-risk' ? 'calc-badge-yellow' : 'calc-badge-green'}`;
        tinettiBadge.textContent = label;

        tinettiInterpretationLabel.textContent = label;
        tinettiInterpretationDescription.textContent = description;

        tinettiInterpretationBox.classList.remove("tinetti-low-risk", "tinetti-moderate-risk", "tinetti-high-risk");
        tinettiInterpretationBox.classList.add(className);

        tinettiMcidNote.hidden = false;
        tinettiResults.hidden = false;
    }

    tinettiBalance.forEach(input => input.addEventListener("change", calculateTinetti));
    tinettiGait.forEach(input => input.addEventListener("change", calculateTinetti));

    if (tinettiReset) {
        tinettiReset.addEventListener("click", () => {
            tinettiCalculator.reset();
            calculateTinetti();
        });
    }

    calculateTinetti();
}