import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'

function FormPost(props) {
  const {
    onSubmit,
    onChange,
    loading,
    stateFormData,
    stateFormError,
    stateFormValid,
    stateFormMessage,
  } = props;
  const router = useRouter()
  const upload = useRef(null);
  const [isLoading, setLoading] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState(null);

  const fotografSec = (e) => {
    setLoading(true)
    setPhoto(e.target.files)
    setPreview(URL.createObjectURL(e.target.files[0]))
    fotografYukle(e.target.files)
  }

  const fotografYukle = (foto) => {
    fetch("/api/post/getDescription")
      .then(res => res.json())
      .then(response => {
        setResponse(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <main style={{ width: "100%" }}>
      {response ?
        <article style={{ width: "70%" }} className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
          <section className="rounded-xl bg-green-50 h-full overflow-auto p-8 w-full h-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <img className="rounded-md mt-3" src={preview} width="120px" height="120px" />
              <p className="text-center mb-10">Fotoğrafın içeriği {((response.data[0].probability) * 100).toFixed(2)}% ihtimalle <strong>{response.data[0].className}</strong></p>
              <p className="text-center">{JSON.stringify(response)}</p>
            </header>
          </section>
        </article>
        :
        isLoading ?
          <article style={{ width: "70%" }} className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
            <section className="rounded-xl bg-green-50 h-full overflow-auto p-8 w-full h-full flex flex-col">
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                  <span>Yükleniyor...</span>
                </p>
                <img className="rounded-md mt-3" src={preview} width="120px" height="120px" />
              </header>
            </section>
          </article>
          :
          <article style={{ width: "70%" }} className="flex flex-col bg-white shadow-xl rounded-md" onClick={() => upload.current.click()} onDrop={(e) => fotografSec(e)}>
            <section className="rounded-xl bg-green-50 h-full overflow-auto p-8 w-full h-full flex flex-col">
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <input id="fotoInput"
                  type="file"
                  accept="image/*"
                  ref={upload}
                  style={{ display: 'none' }}
                  onChange={(e) => fotografSec(e)}
                />
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                  <span>Sürükleyerek veya butona basarak basarak</span>
                </p>
                <button id="button" className="mt-2 rounded-sm px-3 py-1 bg-green-200 hover:bg-green-300 focus:shadow-outline focus:outline-none">
                  Fotoğraf Yükle
                </button>
              </header>
            </section>
          </article>
      }
    </main>
  );
}
export default FormPost;
