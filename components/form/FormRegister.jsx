function FormRegister({ props }) {
  const {
    onSubmitHandler,
    onChangeHandler,
    loading,
    stateFormData,
    stateFormError,
    stateFormMessage,
  } = props;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="form-register card"
      method="POST"
    >
      <div className="form-group" style={{ width: 600 }}>
        <h2>Kayıt Ol</h2>
        <hr />
        {stateFormMessage.status === 'error' && (
          <h4 className="warning text-center">{stateFormMessage.error}</h4>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Kullanıcı adı</label>
        <input
          onChange={onChangeHandler}
          className="form-control"
          type="text"
          id="username"
          name="username"
          placeholder="Kullanıcı adı"
          readOnly={loading && true}
          value={stateFormData.username.value}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-posta</label>
        <input
          onChange={onChangeHandler}
          className="form-control"
          type="text"
          id="email"
          name="email"
          placeholder="E-posta"
          readOnly={loading && true}
          defaultValue={stateFormData.email.value}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Şifre</label>
        <input
          onChange={onChangeHandler}
          className="form-control"
          type="password"
          id="password"
          name="password"
          placeholder="Şifre"
          readOnly={loading && true}
          defaultValue={stateFormData.password.value}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-block btn-warning"
          disabled={loading}
        >
          {!loading ? 'Kayıt ol' : 'Kayıt olunuyor...'}
        </button>
      </div>
    </form>
  );
}
export default FormRegister;
