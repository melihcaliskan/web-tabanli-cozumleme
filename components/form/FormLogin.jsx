function FormLogin({ props }) {
  const {
    onSubmitHandler,
    onChangeHandler,
    loading,
    stateFormData,
    stateFormError,
    stateFormMessage,
  } = props;

  return (
    <form className="form-login card" style={{ margin: "0 auto" }} method="POST" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <h2>Giriş Yap</h2>
        <hr />
        {stateFormMessage.status === 'error' && (
          <h4 className="warning text-center">{stateFormMessage.error}</h4>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">E-posta</label>
        <input
          className="form-control"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          readOnly={loading && true}
          value={stateFormData.email.value}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Şifre</label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          placeholder="Şifre"
          onChange={onChangeHandler}
          readOnly={loading && true}
          value={stateFormData.email.password}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-block btn-warning"
          disabled={loading}
        >
          {!loading ? 'Giriş Yap' : 'Giriş Yapılıyor...'}
        </button>
      </div>
    </form>
  );
}
export default FormLogin;
