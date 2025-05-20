const json = {
  "id": 1681195183773,
  "name": "导出列表",
  "type": "3",
  "runShow": "$root.render(() => {\n  const { customConfig = {} } = ($root.state || {}).doc || {}\n  return !customConfig.hideExport\n})\n",
  "run": "const tableParams = $root.getValueByKeys( $root, \"tableParams\", {} )\n  const exportConfig = $root.getValueByKeys(\n    $root,\n    \"state.doc.customConfig.exportConfig\",\n    {}\n  )\n  const rootDepartmentTree = $root.getValueByKeys(\n    $root,\n    \"state.rootDepartmentTree\",\n    []\n  )\n  const columnsInfo = $root.getValueByKeys(\n    $root,\n    \"state.doc.customConfig.columns\",\n    []\n  )\n  const docName = $root.getValueByKeys( $root, \"state.doc.docName\", \"\" )\n  const businessDeptId = $root.getValueByKeys(\n    $root,\n    \"tableParams.businessDeptId\",\n    \"\"\n  )\n  const departmentObj =\n    rootDepartmentTree.find( ( v ) => v.id === businessDeptId ) || {}\n\n  let columnsArr = []\n  for ( let i of columnsInfo ) {\n    if ( i.children ) {\n      columnsArr = columnsArr.concat( i.children )\n    } else {\n      columnsArr.push( i )\n    }\n  }\n\n  const headers = columnsArr\n    .filter( ( v ) => !v.hideInTable && v.valueType !== \"indexBorder\" )\n    .map( ( v, k ) => v.title )\n    .join( \",\" )\n  const columns = columnsArr\n    .filter( ( v ) => !v.hideInTable && v.valueType !== \"indexBorder\" )\n    .map( ( v, k ) => v.dataIndex )\n    .join( \",\" )\n  let tableParamsInfo = Object.assign( {}, tableParams )\n  delete tableParamsInfo[ \"_timestamp\" ]\n  const year=tableParamsInfo[ \"s-year\" ]\n  const loading = $root.$message.loading( \"加载中\" )\n  $api\n    .download(\n      exportConfig.url || \"/nursingquality/book/export\",\n      Object.assign( {}, tableParamsInfo, {\n        headers,\n        columns,\n        year,\n        filename:\n          ( departmentObj.departmentName || \"\" ) +\n          ( year || \"\" ) +\n          docName,\n      } ),\n      {},\n      \"get\"\n    )\n    .finally( () => {\n      loading()\n    } )"
}


const run = () => {
  return `const tableParams = $root.getValueByKeys( $root, "tableParams", {} )
  const exportConfig = $root.getValueByKeys(
    $root,
    "state.doc.customConfig.exportConfig",
    {}
  )
  const rootDepartmentTree = $root.getValueByKeys(
    $root,
    "state.rootDepartmentTree",
    []
  )
  const columnsInfo = $root.getValueByKeys(
    $root,
    "state.doc.customConfig.columns",
    []
  )
  const docName = $root.getValueByKeys( $root, "state.doc.docName", "" )
  const businessDeptId = $root.getValueByKeys(
    $root,
    "tableParams.businessDeptId",
    ""
  )
  const departmentObj =
    rootDepartmentTree.find( ( v ) => v.id === businessDeptId ) || {}

  let columnsArr = []
  for ( let i of columnsInfo ) {
    if ( i.children ) {
      columnsArr = columnsArr.concat( i.children )
    } else {
      columnsArr.push( i )
    }
  }

  const headers = columnsArr
    .filter( ( v ) => !v.hideInTable && v.valueType !== "indexBorder" )
    .map( ( v, k ) => v.title )
    .join( "," )
  const columns = columnsArr
    .filter( ( v ) => !v.hideInTable && v.valueType !== "indexBorder" )
    .map( ( v, k ) => v.dataIndex )
    .join( "," )
  let tableParamsInfo = Object.assign( {}, tableParams )
  delete tableParamsInfo[ "_timestamp" ]
  const year=tableParamsInfo[ "s-year" ]
  const loading = $root.$message.loading( "加载中" )
  $api
    .download(
      exportConfig.url || "/nursingquality/book/export",
      Object.assign( {}, tableParamsInfo, {
        headers,
        columns,
        year,
        filename:
          ( departmentObj.departmentName || "" ) +
          ( year || "" ) +
          docName,
      } ),
      {},
      "get"
    )
    .finally( () => {
      loading()
    } )`
}



console.log( JSON.parse( JSON.stringify( json.run, null, 2 ) ) );
