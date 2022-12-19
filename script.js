// Verifique se o navegador suporta a API de síntese de voz
if ('speechSynthesis' in window) {
    // Obtenha a referência da área de texto, da caixa de seleção de idioma e dos controles de volume e velocidade
    const textarea = document.querySelector('#texto');
    const idioma = document.querySelector('#idioma');
    const volume = document.querySelector('#volume');
    const velocidade = document.querySelector('#velocidade');

    // Obtenha a referência dos botões de leitura, pausa e continuação
    const botao = document.querySelector('#botao');
    const pausa = document.querySelector('#pausa');
    const continuar = document.querySelector('#continuar');
    const cancelar = document.querySelector('#cancelar');

    // Obtenha a referência da barra de progresso
    const progresso = document.querySelector('#progresso');

    // Adicione um evento de clique ao botão de leitura
    botao.addEventListener('click', function () {
        // Crie uma nova instância de síntese de voz
        const synth = window.speechSynthesis;

        // Obtenha a lista de vozes disponíveis
        const voices = synth.getVoices();

        // Adicione uma opção para que o usuário possa selecionar diferentes vozes de síntese de voz.
        // Para cada voz disponível, adicione uma nova opção à caixa de seleção de idioma
        voices.forEach(function (voice) {
            const option = document.createElement('option');
            option.value = voice.lang;
            option.innerHTML = voice.name;
            idioma.appendChild(option);
        });

        // Selecione a voz que deseja usar
        const voice = voices.find(voice => voice.lang === idioma.value);

        // Crie uma nova instância de uma síntese de voz
        const utterance = new SpeechSynthesisUtterance();

        // Defina o texto que será convertido em voz
        utterance.text = textarea.value;

        // Defina a voz, o volume e a velocidade da síntese de voz
        utterance.voice = voice;
        utterance.volume = volume.value;
        utterance.rate = velocidade.value;

        // Inicie a barra de progresso
        progresso.innerHTML = '<div class="barra"></div>';

        // Adicione um evento de escuta para o evento onboundary da síntese de voz
        utterance.onboundary = function(event) {
          // Obtenha o número de caracteres lidos até o momento
          const caracteresLidos = event.charIndex;

          // Obtenha o total de caracteres no texto
          const totalCaracteres = event.utterance.text.length;

          // Calcule o percentual de caracteres lidos
          const percentualLidos = (caracteresLidos / totalCaracteres) * 100;

          // Atualize a largura da barra de progresso
          progresso.querySelector('.barra').style.width = `${percentualLidos}%`;
        };

        // Adicione um evento de escuta para o evento onend da síntese de voz
        utterance.onend = function() {
            // Limpe a barra de progresso
            progresso.innerHTML = '';
          };
  
          // Inicie a síntese de voz
          synth.speak(utterance);
    });

    // Adicione um evento de clique ao botão de pausa
    pausa.addEventListener('click', function () {
        // Pausa a síntese de voz
        window.speechSynthesis.pause();
    });

    // Adicione um evento de clique ao botão de continuação
    continuar.addEventListener('click', function () {
        // Continua a síntese de voz
        window.speechSynthesis.resume();
    });

    // Adicione um evento de clique ao botão de cancelamento
    cancelar.addEventListener('click', function () {
        // Cancela a síntese de voz
        window.speechSynthesis.cancel();
    });

} else {
    // Mostre uma mensagem de erro se o navegador não suportar a API de síntese de voz
    alert('Seu navegador não suporta a API de síntese de voz');
}