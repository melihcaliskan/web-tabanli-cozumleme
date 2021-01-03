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
    // fetch("/api/yukle")
    //     .then(res => res.json())
    //     .then(response => {
    //         setResponse(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });
  }

  return (
    // <form onSubmit={onSubmit} className="form-post card" method="POST">
    //   <div className="form-group">
    //     <h2>Fotoğraf Yükle</h2>
    //     <hr />
    //     {stateFormMessage.status === 'error' && (
    //       <h4 className="warning text-center">{stateFormMessage.error}</h4>
    //     )}
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="title">Title</label>
    //     <input
    //       className="form-control"
    //       type="text"
    //       id="title"
    //       name="title"
    //       placeholder="Post Title"
    //       onChange={onChange}
    //       readOnly={loading && true}
    //       value={stateFormData.title.value}
    //     />
    //     {stateFormError.title && (
    //       <span className="warning">{stateFormError.title.hint}</span>
    //     )}
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="text">Content</label>
    //     <textarea
    //       className="form-control"
    //       type="text"
    //       id="text"
    //       name="content"
    //       placeholder="Post Content"
    //       onChange={onChange}
    //       readOnly={loading && true}
    //       value={stateFormData.content.value}
    //     />
    //     {stateFormError.content && (
    //       <span className="warning">{stateFormError.content.hint}</span>
    //     )}
    //   </div>
    //   <div>
    //     <button
    //       type="submit"
    //       className="btn btn-block btn-warning"
    //       disabled={loading}
    //     >
    //       {!loading ? 'Gönder' : 'Gönderiliyor...'}
    //     </button>
    //   </div>
    // </form>
    <main style={{ width: "100%" }}>
      {loading ?
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
