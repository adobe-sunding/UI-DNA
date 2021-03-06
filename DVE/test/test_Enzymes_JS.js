/**
 * Created by bgllj on 2016/9/20.
 */

async function task_Enzymes()
{
    console.time('计时');
    var time0 = test.timeStart()
    var select0 = await  enzymes.selectSave();
    console.log(select0)


    var id = []

    var NUM = 3;
    for (var i = 0; i < NUM; i++)
    {
        id[i] = await enzymes.createLayer("await - 新建图层" + i)
        test.seeVelue(await enzymes.getLayerName_byID(id[i]), "await - 新建图层" + (i), `enzymes.createLayer("await - 新建图层${(i)}")`)
    }


    await  enzymes.selectLoad(id);
    var getIds = await enzymes.getSelectLayerArray("id");

    test.seeVelue(getIds, id, "getSelectLayerArray('id')");

    var layerList = await enzymes.getSelectLayerArray();

    var id2 = [];
    for (var i = 0; i < layerList.length; i++)
    {
        id2.push(layerList[i].id)
        let name = await enzymes.getLayerName_byID(layerList[i].id)
        test.seeVelue(name, layerList[i].name, `enzymes.getLayerName_byID(${layerList[i].id})`)

        let exist = await enzymes.checkLayerExist(layerList[i].id, "id");
        test.seeVelue(true, exist.exist, `enzymes.checkLayerExist(${layerList[i].id},"id").exist`)
        test.seeVelue(layerList[i], exist.layerList[0], `enzymes.checkLayerExist(${layerList[i].id},"id").layerList[0]`)

    }
    test.seeVelue(id2, id, "getSelectLayerArray()");


    await  enzymes.selectLoad(select0);
    // 删除-----------
    test.toLog("删除-----------")
    await enzymes.deleteLayer(id[0]);
    var exist = await enzymes.checkLayerExist(id[0], "id");
    test.seeVelue(false, exist.exist, `enzymes.deleteLayer(${id[0]})`)

    id.splice(0, 1);
    await enzymes.deleteLayer(id);
    var isF = false;
    for (var i = 0; i < id.length; i++)
    {
        var exist = await enzymes.checkLayerExist(id[0], "id");
        isF = isF | exist.exist
    }

    test.seeVelue(false, isF, `enzymes.deleteLayer(${id})`)


    //"------read-------"


    //文本写入测试------------------------------------
    var text1 = test.log;
    await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", text1);

    console.time('DOM-readJSON');
    var text2 = await  enzymes.readJSON("__UI-DNA__", "_DNA_DATA_");
    console.timeEnd('DOM-readJSON');
    test.seeVelue(text1, text2, "文本写入 writeJSON() readJSON()");
    console.log(_.truncate(text2, 100))
    //对象写入测试------------------------------------
    var ob = {
        a: {b: [1234]}, d: ["asdsadfsf盛大'发'售", "SDAFASDFS"]
    }


    var text1 = JSON3.stringify(ob);
    await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", text1);

    console.time('DOM-readJSON');
    var text2 = await  enzymes.readJSON("__UI-DNA__", "_DNA_DATA_");
    console.timeEnd('DOM-readJSON');
    window.v = text2;
    test.seeVelue(ob, JSON3.parse(text2), "对象写入 writeJSON() readJSON()");


    var getIds = await enzymes.getSelectLayerArray("id");
    test.seeVelue(select0, getIds, "getSelectLayerArray('select0') 最初选择图层检查");
    console.timeEnd('计时');


    getIds = await enzymes.getAllLayerArray();
    console.time("getLayerInfo_position_byId")
    for (var i = 0; i < getIds.length; i++)
    {
        text1 = await enzymes.getLayerInfo_position_byId(getIds[i].id);
    }
    console.timeEnd("getLayerInfo_position_byId")





    test.toLog("耗时：" + test.timeOut(time0))
    test.report();


    // console.log(await enzymes.getAllLayerArray("id"))
    // console.log(await enzymes.getAllLayerArray("itemIndex"))
    // console.log(await enzymes.getAllLayerArray("name"))
    // console.log(await enzymes.getAllLayerArray())
    // console.log(JSON.stringify(await enzymes.checkLayerExist(3, "id")))
    // console.log(JSON.stringify(await enzymes.checkLayerExist("await - 新建图层2", "name", true)))
    // console.log(JSON.stringify(await enzymes.checkLayerExist("await - 新建图层2", "name")))

    // await  enzymes.writeJSON("__UI-DNA__","_DNA_",JSON.stringify(test));

    Gob.position.assignment.x ="撒打发"
}


//-----------------------------------------------------
export default task_Enzymes;