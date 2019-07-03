import { Toast } from "native-base";

import dictionary from './dictionary';

export function translateFirebaseError(error) {
  console.log('translateFirebaseError', error);

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Endereço de e-mail fornecido já está cadastrado.';
    case 'auth/invalid-email':
      return 'Endereço de e-mail inválido.';
    case 'auth/weak-password':
      return 'Senha fraca.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/user-disabled':
      return 'Usuário não está ativo.';
    case 'auth/wrong-password':
      return 'Senha incorreta.';
    case 'user/update-profile-failed':
      return 'Não foi possível anexar dados do usuário.';
    case 'storage/unknown':
      return 'Ocorreu um erro desconhecido.';
    case 'storage/object-not-found':
      return 'Nenhum objeto na referência desejada.';
    case 'storage/bucket-not-found':
      return 'Nenhum intervalo configurado para o Cloud Storage.';
    case 'storage/project-not-found':
      return 'Nenhum projeto configurado para o Cloud Storage.';
    case 'storage/quota-exceeded':
      return 'A cota do intervalo do Cloud Storage foi excedida.';
    case 'storage/unauthenticated':
      return 'O usuário não está autenticado.';
    case 'storage/unauthorized':
      return 'O usuário não está autorizado a executar a ação desejada.';
    case 'storage/retry-limit-exceeded':
      return 'O limite máximo de tempo em uma operação (upload, download, exclusão etc.) foi excedido. Envie novamente.';
    case 'storage/invalid-checksum':
      return 'O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Envie novamente.';
    case 'storage/canceled':
      return 'O usuário cancelou a operação.';
    case 'storage/invalid-event-name':
      return 'Nome inválido do evento fornecido. Deve ser um de [`running`, `progress`, `pause`]';
    case 'storage/invalid-url':
      return 'URL inválido fornecido a refFromURL().';
    case 'storage/no-default-bucket':
      return 'Nenhum intervalo foi configurado na propriedade storageBucket da sua configuração.';
    case 'storage/server-file-wrong-size':
      return 'O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Envie novamente.';
    default:
      return 'Ocorreu um erro ao realizar a operação';
  }
}

export function showErrors(text) {
  Toast.show({
    text,
    textStyle: { color: "yellow" },
    buttonText: 'Ok'
  })
}

export function showInfo(text) {
  Toast.show({
    text,
    textStyle: { color: "white" },
    buttonText: 'Ok'
  })
}

export function extractInitials(name) {
  const initials = name.match(/\b\w/g) || [];

  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}

export function formatDate(date) {
  return date.toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');
}

export function formatTimestamp(timestamp) {
  if (!timestamp) {
    return null;
  }

  const parsedIntTimestamp = parseInt(timestamp);

  const formattedDate = formatDate(new Date(parsedIntTimestamp));

  return formattedDate;
};

export function pluralize(value, multipleLabel, singleLabel) {
  return value + (value > 1 ? ` ${multipleLabel}` : ` ${singleLabel}`);
};

export function formatDateInterval(targetDate) {
  const now = new Date();

  let seconds = Math.floor((now - (targetDate)) / 1000);

  let minutes = Math.floor(seconds / 60);

  let hours = Math.floor(minutes / 60);

  let days = Math.floor(hours / 24);

  let weeks = Math.floor(days / 7);

  let months = Math.floor(days / 30);

  hours = hours - (days * 24);

  minutes = minutes - (days * 24 * 60) - (hours * 60);

  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  if (months) {
    return pluralize(months, 'meses', 'mês') + ' atrás';
  } else if (weeks) {
    return pluralize(weeks, 'semanas', 'semana') + ' atrás';
  } else if (days) {
    return pluralize(days, 'dias', 'dia') + ' atrás';
  } else if (hours) {
    return pluralize(hours, 'horas', 'hora') + ' atrás';
  } else if (minutes) {
    return pluralize(minutes, 'minutos', 'minuto') + ' atrás';
  } else if (seconds) {
    return pluralize(seconds, 'segundos', 'segundo') + ' atrás';
  }
}

export { handleImagePicked, pickImage, takePhoto } from './uploadUtil';

export function translate(property) {
  return dictionary[property];
}