import axios from "axios";
import { useEffect, useState } from "react";
import endpointsConfig from "../config/endpoints.config";


const SongForm = ({action, isEdit, title, url, selectedId}:
                {action:() => void, isEdit: boolean, title: string, url: string, selectedId: number})  => {
  const [judul, setJudul] =  useState<string>(title);
  const [file, setFile] =  useState<any>();
  const [msg, setMsg] =  useState<string>('');

  const addSong = async (url : string) => {
    if (url === '' || judul === ''){
      setMsg("Song Title Cant Be Empty!")
      return;
    }
    await axios.post(
      endpointsConfig.REST_SERVICE_BASE_URL + "/song", {
        judul: judul,
        audio_path : url
    });
    action();
  };

  const EditSong = async (url : string) => {
    
    if (url === '' || judul === ''){
      setMsg("Song Title Cant Be Empty!")
      return;
    }
    const response = await axios.patch(
      endpointsConfig.REST_SERVICE_BASE_URL + "/song", {
        song_id: selectedId,
        judul: judul,
        audio_path : url
    });
    action();
  };

  const handleFileChange = (event : any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async(event: any) => {

    // If editing song
    if ((isEdit) && (!file)){
      EditSong(url);
      return
    }

    event.preventDefault();
    const data = new FormData();
    data.append('file', file);
    const res = await axios.post(endpointsConfig.REST_SERVICE_BASE_URL + "/upload", data , {
      headers:{
        "Content-type" : "multipart/form-data"
      }
    });
    if (res.data.msg){
      setMsg(res.data.msg);
    } else{
      (isEdit) ? EditSong(res.data.url) : addSong(res.data.url); 
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 mx-auto block max-w-sm p-6 top-40 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
        {" "}
        <div className="py-12">
          <div className="mt-0 max-w-md">
            <h2 className="text-2xl font-bold mb-4">{isEdit? 'Edit Song' : 'Add Song'}</h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="block">
                <span className="text-gray-700">Song Title</span>
                <input
                  type="text"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  onChange={(e) => setJudul(e.target.value)}
                  value={judul}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Audio File</span>
                <input
                  type="file"
                  name= "file"
                  onChange={handleFileChange}
                  className="
                    mt-1
                    block
                    w-full
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder=""
                  
                />
              </label>
              
              <label className="block">
                {msg}
              </label>
            </div>
            <button className="inline-flex items-center mt-6 px-6 py-1 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={handleUpload}
            >
              Save
            </button>
            <button
              className="inline-flex items-center mt-6 mx-4 px-5 py-1 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={action}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongForm;
