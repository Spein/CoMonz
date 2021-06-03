function saveTransaction(authorKey, url, userId, featuredImage, title, firstShot) {
    if (firstShot) {
        firebase.database().ref('transactions/' + authorKey + '/' + url).once('value').then(function(snapshot) {
            var contentUrl = snapshot.val();
            if (contentUrl == undefined) {
                firebase.database().ref('transactions/' + authorKey + '/' + url).set({
                    title: title,
                    img: featuredImage
                });
            }
        });
    } else {
        var date = new Date();
        var parsedDate = JSON.stringify(date);
        var tranRef = firebase.database().ref('transactions/' + authorKey + '/' + url + '/cTransactions/' + userId);
        tranRef.update({
            date: parsedDate
        });
    }
}
export { saveTransaction }