import React from 'react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import Link from 'next/link';

const ShowTree = ({dataTree, baseUrl}:{dataTree:string[],baseUrl:string}) => {

const dig = (dataTree:string[],baseUrl:string):DataNode[] => {
  if(dataTree.length === 0)
  return [];
  let result:DataNode[] = [];
  const treeNodeZero: DataNode = 
  {
    title: <a  target='_blank' href={baseUrl}>{baseUrl}</a>,
    key: baseUrl,
  };
  treeNodeZero.children =[];
  for(let i = 0;i<dataTree.length;++i){
    if(dataTree[i][0] == '1'){
    treeNodeZero.children.push( 
      {
        title: <a target="_blank" href={dataTree[i].substr(1,dataTree[i].length-1)}>{dataTree[i][dataTree[i].length-1]==='/' ? dataTree[i].substr(1,dataTree[i].length-2) :dataTree[i].substr(1,dataTree[i].length-1)}</a> ,
        key: dataTree[i].substr(1),
        children:[]
      } 
    ) 
    }
  }
  for(let i = 0;i<dataTree.length;++i)
    if(dataTree[i][0] === '2')
      for(let j = 0; j<treeNodeZero.children.length;++j)
        if(dataTree[i].includes(treeNodeZero.children[j].key)){
          
          treeNodeZero.children[j].children.push({
            title: <a target="_blank" href={dataTree[i].substr(1,dataTree[i].length-2)}>{dataTree[i].substr(1,dataTree[i].length-1)}</a>  , 
            key: dataTree[i].substr(1)
          }); 
        }
   result.push(treeNodeZero);
  return result;
  
 
};
const data = dig(dataTree,baseUrl);
return(
<>
  
   <Tree treeData={data} selectable={false}   style={{width:'50vw',fontSize:'1.4em'}}  />
  
</>
)
}
export default ShowTree;