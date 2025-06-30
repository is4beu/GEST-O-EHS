function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
const form = document.getElementById('formOcorrencia');
const registros = document.getElementById('registros');
const salvar = (dados) => localStorage.setItem('ocorrencias', JSON.stringify(dados));
const carregar = () => JSON.parse(localStorage.getItem('ocorrencias')) || [];
function exibirOcorrencias() {
  const ocorrencias = carregar();
  registros.innerHTML = '';
  ocorrencias.forEach(o => {
    const div = document.createElement('div');
    div.innerHTML = `
      <hr>
      <strong>Tipo:</strong> ${o.tipo}<br>
      <strong>Descrição:</strong> ${o.descricao}<br>
      ${o.imagem ? `<img src="${o.imagem}" alt="imagem">` : ''}
    `;
    registros.appendChild(div);
  });
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const tipo = document.getElementById('tipo').value;
  const descricao = document.getElementById('descricao').value;
  const imgInput = document.getElementById('imagem');
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = imgInput.files[0] ? reader.result : null;
    const nova = { tipo, descricao, imagem: base64 };
    const lista = carregar();
    lista.push(nova);
    salvar(lista);
    exibirOcorrencias();
    form.reset();
  };
  if (imgInput.files[0]) reader.readAsDataURL(imgInput.files[0]);
  else reader.onload();
});
exibirOcorrencias();
