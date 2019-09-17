// 主站配置
var domainYY = '//yy.vmall.com';
var domainRush = '//buy.vmall.com';
var domainEdit = 'https://customization.vmall.com';
var domainMain = 'https://www.vmall.com';
var domainWap = 'https://m.vmall.com';
var domainCart = '//cart.vmall.com';
var domainRemark = '//remark.vmall.com';
var domainRms = 'https://rms.vmall.com';
var domainShoppingConfig = '//addr.vmall.com';
var imagePath = 'https://res.vmallres.com/20180112/images';
var domainAccount = '//www.vmall.com';
var isUseAccount = 'false';
var upBindPhoneAddr = 'https://hwid1.vmall.com/CAS/portal/bindPhoneAccount.html?lang=zh-cn&amp;themeName=cloudTheme&amp;reqClientType=26';
var dominWapRecycle = 'https://mobile.huishoubao.com/?pid=1056';
var domainCds = 'https://cds.vmall.com';
var domainIps = 'https://cashier.vmall.com/cashier/voucher'; // 新版代金券
var scriptPath = 'https://res9.vmallres.com/20180202/js';
var domainAms = "https://act.vmall.com"; // 活动
var domainUc = 'https://member.vmall.com'; // 用户中心
var pmsHttpDomain = '//product.vmall.com/';
var mediaPath = 'https://res.vmallres.com/pimages/';
var dapDomain = 'https://dap.vmall.com'; // dap数据上报

// 活动页面
var prebookDomain = "https://mm.vmall.com"; // 预约
var ifmLogin = 'https://hwid1.vmall.com/CAS/portal/ifmLogin.html'; // UP登录
var whitelist = [
    'https://www.vmall.com',
    'https://sale.vmall.com',
    'https://shop.huawei.com',
    'https://shop.huawei.ru',
    'https://www.hihonor.com',
    'https://www.hihonor.com/nl',
    'https://shop.huawei.com/pl',
    'https://shop.huawei.com/cz'
];

// 多国配置
(function(window) {
    var locale = window.pageConfig.locale;
    var config = {
        domainMain: {
            "zh-CN": "https://www.vmall.com",
            "en-US": "https://www.hihonor.com/us",
            "en-GB": "https://www.hihonor.com/uk",
            "es-ES": "https://www.hihonor.com/es",
            "de-DE": "https://www.hihonor.com/de",
            "fr-FR": "https://www.hihonor.com/fr",
            "it-IT": "https://www.hihonor.com/it",
            "en-IN": "https://www.hihonor.com/in",
            "en-MY": "https://www.hihonor.com/my",
            "en-MYHW": "https://shop.huawei.com/my",
            "ru-RU": "https://shop.huawei.ru",
            "ru-RUHW": "https://shop.huawei.com/ru",
            "ru-RUHONOR": "https://www.honor.ru",
            "cz-CZHW": "https://shop.huawei.com/cz",
            "pl-PLHW": "https://shop.huawei.com/pl",
            "nl-NL": "https://www.hihonor.com/nl",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "https://www.hihonor.com/sa-en",
            "es-MXHW": "https://shop.huawei.com/mx",
        },
        registerUrl: {
            "zh-CN": 'https://hwid1.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000000&reqClientType=26&lang=zh-CN&countryCode=cn',
            "en-US": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000109&reqClientType=26&lang=en-gb&countryCode=us',
            "en-GB": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000702&reqClientType=26&lang=en-gb&countryCode=gb',
            "es-ES": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000705&reqClientType=26&lang=es-es&countryCode=es',
            "de-DE": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000704&reqClientType=26&lang=de-de&countryCode=de',
            "fr-FR": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000703&reqClientType=26&lang=fr-fr&countryCode=fr',
            "it-IT": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000701&reqClientType=26&lang=it-it&countryCode=it',
            "en-IN": 'https://hwid5.vmall.com/CAS/portal/userRegister/regbyemail.html?loginChannel=26000000&reqClientType=26&lang=en-in&countryCode=in',
            "en-MY": 'https://hwid5.vmall.com/CAS/portal/userRegister/regbyemail.html?loginChannel=26003800&reqClientType=26&lang=en-gb&countryCode=my&themeName=blue',
            "en-MYHW": 'https://hwid5.vmall.com/CAS/portal/userRegister/regbyemail.html?loginChannel=26003850&reqClientType=26&lang=en-gb&countryCode=my',
            "ru-RU": 'https://hwid8.vmall.com/CAS/portal/userRegister/regbyphone.html?loginChannel=26000008&reqClientType=26&lang=ru-RU&countryCode=ru',
            "ru-RUHW": 'https://hwid8.vmall.com/CAS/portal/userRegister/regbyemail.html?reqClientType=2630&loginChannel=26000330&countryCode=ru&lang=ru-ru&themeName=red&loginUrl=https%3A%2F%2Fhwid8.vmall.com%2FCAS%2Fportal%2Flogin.html',
            "ru-RUHONOR": 'https://hwid8.vmall.com/CAS/portal/userRegister/regbyemail.html?reqClientType=2608&loginChannel=26000108&countryCode=ru&lang=ru-ru&themeName=blue&loginUrl=https%3A%2F%2Fhwid8.vmall.com%2FCAS%2Fportal%2Flogin.html',
            "cz-CZHW": 'https://hwid7.vmall.com/CAS/portal/userRegister/regbyemail.html?loginChannel=26000809&reqClientType=2689&lang=cs-cz&countryCode=cz&themeName=red',
            "pl-PLHW": "https://hwid7.vmall.com/CAS/portal/userRegister/regbyemail.html?loginChannel=26000808&reqClientType=2688&lang=pl-pl&countryCode=pl&themeName=red",
            "nl-NL": "https://id7.cloud.huawei.com/CAS/portal/userRegister/regbyemail.html?loginChannel=26000708&reqClientType=2661&countryCode=nl&lang=nl-nl&themeName=blue",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
            "es-MXHW": "",
        },
        infoLink: {
            "zh-CN": 'https://hwid1.vmall.com/CAS/portal/userCenter/info.html?loginChannel=26000000&reqClientType=26&lang=zh-CN&countryCode=cn',
            "en-US": 'https://www.hihonor.com/us/member/myInformation',
            "en-GB": 'https://www.hihonor.com/uk/member/myInformation',
            "es-ES": 'https://www.hihonor.com/fr/member/myInformation',
            "de-DE": 'https://www.hihonor.com/de/member/myInformation',
            "fr-FR": 'https://www.hihonor.com/es/member/myInformation',
            "it-IT": 'https://www.hihonor.com/it/member/myInformation',
            "en-IN": 'https://www.hihonor.com/in/member/myInformation',
            "en-MY": 'https://www.hihonor.com/my/member/myInformation',
            "en-MYHW": 'https://hwid1.vmall.com/CAS/portal/userCenter/index.html',
            "ru-RUHW": "",
            "cz-CZHW": "",
            "pl-PLHW": "",
            "nl-NL": "",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
        },
        openapiDomain: {
            "zh-CN": "https://openapi.vmall.com",
            "en-US": "",
            "en-GB": "https://apiserver-eu.hihonor.com",
            "es-ES": "https://apiserver-eu.hihonor.com",
            "de-DE": "https://apiserver-eu.hihonor.com",
            "fr-FR": "https://apiserver-eu.hihonor.com",
            "it-IT": "https://apiserver-eu.hihonor.com",
            "en-IN": "https://apiserver-sg.hihonor.com",
            "en-MY": "https://apiserver-sg.hihonor.com",
            "en-MYHW": "https://shop-cart.huawei.com/sg/openapi",
            "ru-RU": "https://shop-apiserver.huawei.com/ru",
            "ru-RUHW": "https://shop-apiserver.huawei.com/ru",
            "ru-RUHONOR": "https://openapi.honor.ru",
            "cz-CZHW": "https://shop-apiserver.huawei.com/eu",
            "pl-PLHW": "https://shop-apiserver.huawei.com/eu",
            "nl-NL": "https://apiserver-eu.hihonor.com",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
            "es-MXHW": "",
        },
        amsDomain: {
            "zh-CN": 'https://act.vmall.com',
            "en-US": "https://amsfront-us.hihonor.com",
            "en-GB": "https://amsfront-it.hihonor.com",
            "es-ES": "https://amsfront-it.hihonor.com",
            "de-DE": "https://amsfront-it.hihonor.com",
            "fr-FR": "https://amsfront-it.hihonor.com",
            "it-IT": "https://amsfront-it.hihonor.com",
            "en-IN": "https://amsfront-sg.hihonor.com",
            "en-MY": 'https://amsfront-sg.hihonor.com',
            "en-MYHW": 'https://shop-ams.huawei.com/sg',
            "ru-RUHW": "https://ams-ru.honormobiles.info",
            "cz-CZHW": "",
            "pl-PLHW": "",
            "nl-NL": "",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
        },
        domainCart: {
            "zh-CN": "//cart.vmall.com",
            "en-US": "//cart-us.hihonor.com",
            "en-GB": "//cart-gb.hihonor.com",
            "es-ES": "//cart-es.hihonor.com",
            "de-DE": "//cart-de.hihonor.com",
            "fr-FR": "//cart-fr.hihonor.com",
            "it-IT": "//cart-it.hihonor.com",
            "en-IN": "//cart-sg.hihonor.com",
            "en-MY": "//cart-sg.hihonor.com",
            "en-MYHW": "//shop-cart.huawei.com/sg",
            "ru-RUHW": "",
            "cz-CZHW": "",
            "pl-PLHW": "",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
        },
        domainYY: {
            "zh-CN": '//yy.vmall.com',
            "en-US": '',
            "en-GB": '',
            "es-ES": '',
            "de-DE": '',
            "fr-FR": '',
            "it-IT": '',
            "en-IN": '//rushyy.hihonor.com/in',
            "en-MY": '',
            "en-MYHW": '',
            "ru-RUHW": "",
            "cz-CZHW": "",
            "pl-PLHW": "",
            "nl-NL": "",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
        },
        loginLink: {
            "zh-CN": '',
            "en-US": '',
            "en-GB": '',
            "es-ES": '',
            "de-DE": '',
            "fr-FR": '',
            "it-IT": '',
            "en-IN": '',
            "en-MY": '',
            "en-MYHW": '',
            "ru-RUHW": "",
            "cz-CZHW": "",
            "pl-PLHW": "",
            "nl-NL": "",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
        },
        registerLink: {
            "zh-CN": '',
            "en-US": '',
            "en-GB": '',
            "es-ES": '',
            "de-DE": '',
            "fr-FR": '',
            "it-IT": '',
            "en-IN": '',
            "en-MY": '',
            "en-MYHW": '',
            "ru-RUHW": "",
            "cz-CZHW": "",
            "pl-PLHW": "",
            "nl-NL": "",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
        },
        timeZone: {
            "zh-CN": 8,
            "en-US": -5,
            "en-GB": 1,
            "es-ES": 2,
            "de-DE": 2,
            "fr-FR": 2,
            "it-IT": 2,
            "en-IN": 5.5,
            "en-MY": 8,
            "en-MYHW": 8,
            "ru-RU": 3,
            "ru-RUHW": 3,
            "ru-RUHONOR": 3,
            "cz-CZHW": 1,
            "pl-PLHW": 1,
            "nl-NL": 1,
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
            "es-MXHW": -6,
        },
        facebookAppId: {
            "zh-CN": '',
            "en-US": '370515210122879',
            "en-GB": '370515210122879',
            "es-ES": '370515210122879',
            "de-DE": '370515210122879',
            "fr-FR": '370515210122879',
            "it-IT": '370515210122879',
            "en-IN": '370515210122879',
            "en-MY": '370515210122879',
            "en-MYHW": '365357210674045',
            "ru-RU": '2269742083346754',
            "ru-RUHW": '2269742083346754',
            "ru-RUHONOR": '2269742083346754',
            "cz-CZHW": '2193474120966527',
            "pl-PLHW": '643556152771470',
            "nl-NL": "425559394676355",
            "ar-AEHW": "",
            "en-AEHW": "",
            "ar-AE": "",
            "en-AE ": "",
            "ar-SAHW": "",
            "en-SAHW": "",
            "ar-SA": "",
            "en-SA": "",
            "es-MXHW": '370515210122879',
        }
    };
    var serviceUrl;
    if (locale == 'zh-CN') {
        serviceUrl = encodeURIComponent(config.domainMain[locale] + "/account/caslogin");
    } else
    if (locale == 'ru-RUHW' || locale == 'ru-RUHONOR' || locale == 'nl-NL') {
        serviceUrl = encodeURIComponent(config.domainMain[locale] + "/account/acaslogin?url=" + encodeURIComponent(window.location.href));
    } else {
        serviceUrl = encodeURIComponent(config.domainMain[locale] + "/account/acaslogin");
    }

    // 登录
    config.loginLink[locale] = config.domainMain[locale] + '/account/login?url=' + encodeURIComponent(window.location.href);
    // 注册
    config.registerLink[locale] = config.registerUrl[locale] + '&service=' + serviceUrl;


    for (x in config) {
        window[x] = config[x][locale];
    }

    delete window.registerUrl;
})(window);
