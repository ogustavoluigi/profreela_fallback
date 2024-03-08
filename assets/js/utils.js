export function getDateBR(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function dateDiff(date) {
    const currentDate = new Date();

    let diffMilliseconds = Math.abs(currentDate - date);
    let diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    let diffHours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let diffMinutes = Math.round(((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)));
    let diffSeconds = Math.round(((diffMilliseconds % (1000 * 60)) / 1000));

    return {
        "days": diffDays,
        "hours": diffHours,
        "minutes": diffMinutes,
        "seconds": diffSeconds
    };
}

export function getUTC(date) {
    let ano = date.getUTCFullYear();
    let mes = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    let dia = ("0" + date.getUTCDate()).slice(-2);
    let horas = ("0" + date.getUTCHours()).slice(-2);
    let minutos = ("0" + date.getUTCMinutes()).slice(-2);
    let segundos = ("0" + date.getUTCSeconds()).slice(-2);

    return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}Z`;
}

export function dateDiffForHumans(date) {
    let $diff = dateDiff(date);

    if ($diff["days"] == 1) return "há " + $diff["days"] + " dia";
    if ($diff["days"] > 1) return "há " + $diff["days"] + " dias";
    if ($diff["hours"] == 1) return "há " + $diff["hours"] + " hora";
    if ($diff["hours"] > 1) return "há " + $diff["hours"] + " horas";
    if ($diff["minutes"] == 1) return "há " + $diff["minutes"] + " minuto";
    if ($diff["minutes"] > 1) return "há " + $diff["minutes"] + " minutos";
    if ($diff["seconds"] == 1) return "há " + $diff["seconds"] + " segundo";
    if ($diff["seconds"] > 1) return "há " + $diff["seconds"] + " segundos";

    return "agora";
}

export function isToday(date) {
    const currentDate = new Date();
    return (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    );
}

export function formatBr(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }).format(date);
}

export function url(path = "") {
    const baseUrlElement = document.getElementById("base-url");
    const baseUrl = baseUrlElement ? baseUrlElement.getAttribute("content") : "";
    return baseUrl + path;
}