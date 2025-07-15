
// Datos de materias y sus requisitos
const materias = [
  { id: "bio1", nombre: "Intro a Biología Celular", abre: ["bio2"] },
  { id: "salud1", nombre: "Salud Pública y Humanidades", abre: ["anato3"] },
  { id: "bioest", nombre: "Intro a Bioestadística", abre: [] },
  { id: "ap1", nombre: "Aprendizaje en Territorio 1", abre: ["ap2"] },
  { id: "bio2", nombre: "Biología Celular y Molecular", abre: ["histo1", "neuro1", "cardio1", "hemato"] },
  { id: "ap2", nombre: "Aprendizaje en Territorio 2", abre: ["metod1"] },
  { id: "anato3", nombre: "Anatomía Clínica y Bioética", abre: ["digestivo"] },
  { id: "fisica", nombre: "Biofísica Muscular y Locomoción", abre: [] },
  { id: "histo1", nombre: "Histología Neuro/Cardio/Respiratorio", abre: [] },
  { id: "neuro1", nombre: "Neurociencias", abre: [] },
  { id: "cardio1", nombre: "Cardiovascular y Respiratorio", abre: [] },
  { id: "digestivo", nombre: "Digestivo/Renal/Endocrino/Metabolismo", abre: [] },
  { id: "hemato", nombre: "Hematología e Inmunología", abre: ["med1", "patobases", "pediatria", "gine"] },
  { id: "metod1", nombre: "Metodología Científica", abre: [] },
  { id: "med1", nombre: "Medicina 1° Nivel", abre: ["medfam"] },
  { id: "patobases", nombre: "Bases Patología", abre: ["clinicamed", "patotera", "quirurgica", "patoquir"] },
  { id: "gine", nombre: "Ginecología-Neonatología", abre: [] },
  { id: "pediatria", nombre: "Pediatría", abre: [] },
  { id: "clinicamed", nombre: "Clínica Médica", abre: [] },
  { id: "patotera", nombre: "Patología Médica y Terapéutica", abre: [] },
  { id: "quirurgica", nombre: "Clínica Quirúrgica", abre: [] },
  { id: "patoquir", nombre: "Patología Quirúrgica", abre: [] },
  { id: "medfam", nombre: "Medicina Familiar y Comunitaria", abre: ["metod2"] },
  { id: "metod2", nombre: "Metodología Científica II", abre: ["internado"] },
  { id: "internado", nombre: "Internado Rotatorio", abre: [] },
];

// Guardar el estado de materias aprobadas
const estadoMaterias = {};

materias.forEach(m => estadoMaterias[m.id] = false);

// Renderizar malla
function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";
  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");
    div.textContent = m.nombre;

    if (!estadoMaterias[m.id] && !materiaDesbloqueada(m.id)) {
      div.classList.add("locked");
    } else if (estadoMaterias[m.id]) {
      div.classList.add("approved");
    }

    div.onclick = () => aprobarMateria(m.id);
    contenedor.appendChild(div);
  });
}

// Aprobar materia
function aprobarMateria(id) {
  if (!materiaDesbloqueada(id) || estadoMaterias[id]) return;
  estadoMaterias[id] = true;
  const abre = materias.find(m => m.id === id).abre;
  abre.forEach(dep => estadoMaterias[dep] = false); // se desbloquean
  renderMalla();
}

// Determina si una materia está desbloqueada
function materiaDesbloqueada(id) {
  // Si no tiene ningún prerrequisito, está desbloqueada
  const esRequisito = materias.filter(m => m.abre.includes(id));
  if (esRequisito.length === 0) return true;
  // Está desbloqueada si al menos uno de sus requisitos está aprobado
  return esRequisito.some(m => estadoMaterias[m.id]);
}

renderMalla();
