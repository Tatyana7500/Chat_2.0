function RequestSender () {
}

RequestSender.sendGETRequest = function(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };

    xhr.send();
};

RequestSender.sendPOSTRequest = function(url, data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                onSuccess(xhr.responseText);
            } else {
                onError(xhr.responseText);
            }
        }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
};