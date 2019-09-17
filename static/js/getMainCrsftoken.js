function getMainCrsftoken() {
        $.ajax({
            type: 'GET',
            url: window.main + '/vmallcsrf.js',
            cache: false,
            async: false,
            timeout: 5000,
            dataType: 'script',
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                setCsrftoken = true;
            },
            error:function(){
                console.log('request error');
            }
        });
    };

    getMainCrsftoken();


