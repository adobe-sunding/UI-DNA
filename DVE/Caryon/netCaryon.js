/**
 * Created by nullice on 2017/4/9.
 */

var axios = require("axios")

/**
 * 网络通信核心
 * @returns {netCaryon}
 */
var netCaryon = function ()
{
    this.HOSTURL = ["http://127.0.0.1", "http://design-enzyme.com"][0]
    return this;
}


netCaryon.prototype.getOnce = async function (url)
{
    var self = this
    return new Promise(function (resolve, reject)
    {
        axios.get(self.HOSTURL + url)
            .then(function (response)
            {
                console.info("axios.get", response)
                resolve(response.data)
            })
            .catch(function (error)
            {
                console.info("axios.get", error)
                reject(error);
            });

    })
}


netCaryon.prototype.getOfficialMessges = async function (url)
{
    var self = this
    return await this.getOnce('/api/uidna/messge')
}

netCaryon.prototype.getLatestVersion= async function (url)
{
    var self = this
    return await this.getOnce('/api/uidna/latest_var')
}

export  default netCaryon