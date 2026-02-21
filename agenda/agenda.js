// ===== CONFIG =====
const HORARIOS = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];
const WHATS_PRO = "5519991046126"; // Whats da profissional (com DDI+DDD)

// ===== ELEMENTOS =====
const diaEl = document.getElementById("dia");
const listaEl = document.getElementById("listaHorarios");
const nomeEl = document.getElementById("nome");
const whatsEl = document.getElementById("whats");
const servicoEl = document.getElementById("servico");
const horarioEl = document.getElementById("horarioEscolhido");
const btn = document.getElementById("btnConfirmar");
const badge = document.getElementById("statusBadge");

// ===== FUNÇÕES =====
function keyDia(dia) {
  return `agenda_reservas_${dia}`;
}

function getReservas(dia) {
  try {
    return JSON.parse(localStorage.getItem(keyDia(dia)) || "[]");
  } catch {
    return [];
  }
}

function setReservas(dia, reservas) {
  localStorage.setItem(keyDia(dia), JSON.stringify(reservas));
}

function setBadge(txt) {
  badge.textContent = txt;
}

function renderHorarios() {
  const dia = diaEl.value;
  listaEl.innerHTML = "";

  if (!dia) {
    listaEl.innerHTML = `<div style="opacity:.75;">Selecione uma data acima.</div>`;
    setBadge("Selecione uma data");
    return;
  }

  const reservas = getReservas(dia);
  setBadge("Escolha um horário");

  HORARIOS.forEach(h => {
    const ocupado = reservas.includes(h);

    const div = document.createElement("div");
    div.className = "slot";

    div.innerHTML = `
      <div>
        <strong>${h}</strong>
        <small>${ocupado ? "— indisponível" : "— disponível"}</small>
      </div>
      <button class="btn" ${ocupado ? "disabled" : ""}>
        ${ocupado ? "Ocupado" : "Selecionar"}
      </button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      // reserva local (v1)
      const novas = Array.from(new Set([...reservas, h]));
      setReservas(dia, novas);

      horarioEl.value = `${dia} às ${h}`;
      setBadge("Pronto para confirmar");
      renderHorarios();
      validar();
    });

    listaEl.appendChild(div);
  });
}

function validar() {
  const ok =
    diaEl.value &&
    horarioEl.value &&
    nomeEl.value.trim().length >= 2 &&
    whatsEl.value.trim().length >= 8 &&
    servicoEl.value;

  btn.disabled = !ok;
}

function limparHorario() {
  horarioEl.value = "";
  validar();
}

// ===== EVENTOS =====
diaEl.addEventListener("change", () => {
  limparHorario();
  renderHorarios();
});

[nomeEl, whatsEl, servicoEl].forEach(el => el.addEventListener("input", validar));

btn.addEventListener("click", () => {
  const msg =
`Olá! Quero agendar um horário 😊

Nome: ${nomeEl.value}
Whats: ${whatsEl.value}
Serviço: ${servicoEl.value}
Horário: ${horarioEl.value}`;

  const url = `https://wa.me/${WHATS_PRO}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});

// ===== START =====
renderHorarios();
validar();
