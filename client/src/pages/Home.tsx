import { FormEvent, useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Check, ChevronDown, CirclePause, CirclePlay,
  Code2, Copy, KeyRound, LogOut, Plus, ShieldCheck, Trash2, Users,
} from "lucide-react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

type View = "keys" | "api";

const durationLabels: Record<number, string> = {
  1: "1 día",
  3: "3 días",
  7: "7 días",
  30: "30 días",
};

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function Home() {
  const [view, setView] = useState<View>("keys");
  const [prefix, setPrefix] = useState<"ACUSADO" | "POCOYO7X">("POCOYO7X");
  const [durationDays, setDurationDays] = useState(1);
  const [maxUsers, setMaxUsers] = useState(1);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");
  const { user, loading, isAuthenticated, logout } = useAuth();
  const utils = trpc.useUtils();
  const isAdmin = user?.role === "admin";

  const keysQuery = trpc.keys.list.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = trpc.keys.create.useMutation({
    onSuccess: async result => {
      setCreatedKey(result.key);
      setCopied(false);
      setNotice("Key creada. Cópiala ahora; por seguridad no volverá a mostrarse completa.");
      await utils.keys.list.invalidate();
    },
    onError: error => setNotice(error.message || "No se pudo crear la key."),
  });

  const pauseMutation = trpc.keys.setPaused.useMutation({
    onSuccess: async () => { setNotice("Estado actualizado."); await utils.keys.list.invalidate(); },
    onError: error => setNotice(error.message || "No se pudo actualizar la key."),
  });

  const deleteMutation = trpc.keys.delete.useMutation({
    onSuccess: async () => { setNotice("Key eliminada y revocada."); await utils.keys.list.invalidate(); },
    onError: error => setNotice(error.message || "No se pudo eliminar la key."),
  });

  const keys = keysQuery.data ?? [];
  const summary = useMemo(() => {
    const active = keys.filter(item => !item.paused && new Date(item.expiresAt).getTime() > Date.now()).length;
    const paused = keys.filter(item => item.paused).length;
    const users = keys.reduce((total, item) => total + item.usedUsers, 0);
    return { total: keys.length, active, paused, users };
  }, [keys]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setCreatedKey(null);
    createMutation.mutate({ prefix, durationDays, maxUsers: Number(maxUsers) });
  }

  async function copyCreatedKey() {
    if (!createdKey) return;
    try {
      await navigator.clipboard.writeText(createdKey);
      setCopied(true);
      setNotice("Key copiada al portapapeles.");
    } catch {
      setNotice("No se pudo copiar automáticamente. Selecciona y copia la key manualmente.");
    }
  }

  async function handleLogout() {
    try { await logout(); } catch { setNotice("No se pudo cerrar la sesión."); }
  }

  if (loading) {
    return <div className="boot-screen"><div className="brand-mark">P<span>7X</span></div><div className="loader-line" /><p>Preparando el panel seguro…</p></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="brand-mark">P<span>7X</span></div>
          <div className="eyebrow"><span className="live-dot" /> CONSOLA DE LICENCIAS</div>
          <h1>POCOYO7X</h1>
          <p>Gestiona keys y valida licencias de tu APK desde un solo panel.</p>
          <button className="button button-primary button-wide" onClick={() => startLogin()}>
            <ShieldCheck size={17} /> Iniciar sesión de administrador <ArrowUpRight size={16} />
          </button>
          <div className="security-note"><ShieldCheck size={16} /><span>Las acciones de gestión requieren una cuenta autorizada.</span></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="brand-mark">P<span>7X</span></div>
          <div className="eyebrow"><span className="warning-dot" /> ACCESO RESTRINGIDO</div>
          <h1>Sin permiso de administrador</h1>
          <p>La sesión inició correctamente, pero esta cuenta no tiene permiso para gestionar keys. El administrador debe autorizarla en la configuración del servidor.</p>
          <button className="button button-secondary button-wide" onClick={handleLogout}><LogOut size={16} /> Cerrar sesión</button>
        </div>
      </div>
    );
  }

  const busy = createMutation.isPending || pauseMutation.isPending || deleteMutation.isPending;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup"><div className="brand-icon"><KeyRound size={18} /></div><div><strong>POCOYO<span>7X</span></strong><small>LICENSE CONSOLE</small></div></div>
        <div className="sidebar-label">ADMINISTRACIÓN</div>
        <nav className="side-nav" aria-label="Secciones">
          <button className={view === "keys" ? "nav-item active" : "nav-item"} onClick={() => setView("keys")}><KeyRound size={17} /><span>Keys</span><span className="nav-count">{summary.total}</span></button>
          <button className={view === "api" ? "nav-item active" : "nav-item"} onClick={() => setView("api")}><Code2 size={17} /><span>API e integración</span></button>
        </nav>
        <div className="sidebar-bottom">
          <div className="server-status"><span className="live-dot" /><span>API de licencias</span><b>EN LÍNEA</b></div>
          <button className="profile-button" onClick={handleLogout} title="Cerrar sesión">
            <span className="avatar">{(user?.name || user?.email || "P").slice(0, 1).toUpperCase()}</span>
            <span className="profile-text"><strong>{user?.name || "Administrador"}</strong><small>{user?.email || "Cuenta autorizada"}</small></span>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div><div className="breadcrumb">POCOYO7X <span>/</span> {view === "keys" ? "Keys" : "API e integración"}</div><h1>{view === "keys" ? "Administrar keys" : "API e integración"}</h1></div>
          <div className="top-actions"><span className="environment-pill"><span className="live-dot" /> PANEL ADMIN</span><button className="icon-button mobile-logout" onClick={handleLogout} aria-label="Cerrar sesión"><LogOut size={17} /></button></div>
        </header>

        {view === "keys" ? (
          <>
            <p className="page-intro">Emite licencias, controla sus activaciones y cambia su estado.</p>
            <section className="stats-row" aria-label="Resumen de licencias">
              <div className="stat-card"><span className="stat-icon red"><KeyRound size={17} /></span><div><small>KEYS TOTALES</small><strong>{summary.total}</strong></div></div>
              <div className="stat-card"><span className="stat-icon green"><Activity size={17} /></span><div><small>ACTIVAS</small><strong>{summary.active}</strong></div></div>
              <div className="stat-card"><span className="stat-icon amber"><CirclePause size={17} /></span><div><small>PAUSADAS</small><strong>{summary.paused}</strong></div></div>
              <div className="stat-card"><span className="stat-icon blue"><Users size={17} /></span><div><small>ACTIVACIONES</small><strong>{summary.users}</strong></div></div>
            </section>

            <section className="panel-card create-panel">
              <div className="section-heading"><div><div className="eyebrow">NUEVA LICENCIA</div><h2>Generar una key</h2><p>Elige el formato, la duración y cuántas instalaciones podrá activar.</p></div><span className="heading-icon"><Plus size={19} /></span></div>
              <form className="key-form" onSubmit={handleCreate}>
                <label className="field"><span>Formato de key</span><span className="select-wrap"><select value={prefix} onChange={event => setPrefix(event.target.value as "ACUSADO" | "POCOYO7X")}><option value="ACUSADO">ACUSADO-XXXX</option><option value="POCOYO7X">POCOYO7X-XXXX</option></select><ChevronDown size={16} /></span></label>
                <label className="field"><span>Duración</span><span className="select-wrap"><select value={durationDays} onChange={event => setDurationDays(Number(event.target.value))}><option value={1}>1 día</option><option value={3}>3 días</option><option value={7}>7 días</option><option value={30}>30 días</option></select><ChevronDown size={16} /></span></label>
                <label className="field"><span>Máximo de personas</span><span className="input-wrap"><Users size={16} /><input type="number" min={1} max={100000} required value={maxUsers} onChange={event => setMaxUsers(Number(event.target.value))} /></span></label>
                <button className="button button-primary create-button" type="submit" disabled={busy || maxUsers < 1}><Plus size={17} /> Crear key</button>
              </form>
              <div className="helper-line"><ShieldCheck size={15} /><span>Las keys duran desde el momento de su creación. Cada instalación cuenta como un uso.</span></div>
              {createdKey && <div className="created-key-box"><div><span className="eyebrow">KEY CREADA · CÓPIALA AHORA</span><code>{createdKey}</code><small>No se guarda en claro y no volverá a mostrarse completa.</small></div><button className="button button-secondary copy-button" onClick={copyCreatedKey}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copiada" : "Copiar key"}</button></div>}
              {notice && <div className={notice.includes("No se pudo") ? "notice notice-error" : "notice"} role="status">{notice}</div>}
            </section>

            <section className="panel-card list-panel">
              <div className="section-heading list-heading"><div><div className="eyebrow">INVENTARIO</div><h2>Keys creadas</h2><p>Pausa, reactiva o revoca licencias. La lista muestra un identificador parcial.</p></div><span className="total-pill">{keys.length} {keys.length === 1 ? "key" : "keys"}</span></div>
              {keysQuery.isLoading ? <div className="loading-state">Cargando keys…</div> : keysQuery.error ? <div className="empty-state"><strong>No se pudieron cargar las keys.</strong><span>Comprueba la conexión e inténtalo de nuevo.</span><button className="button button-secondary" onClick={() => keysQuery.refetch()}>Reintentar</button></div> : keys.length === 0 ? <div className="empty-state"><span className="empty-icon"><KeyRound size={22} /></span><strong>Todavía no hay keys</strong><span>Crea la primera con el formulario de arriba.</span></div> : (
                <div className="table-scroll"><table className="keys-table"><thead><tr><th>KEY</th><th>ESTADO</th><th>VENCE</th><th>INSTALACIONES</th><th>ACCIONES</th></tr></thead><tbody>
                  {keys.map(item => {
                    const expired = new Date(item.expiresAt).getTime() <= Date.now();
                    const status = expired ? "expired" : item.paused ? "paused" : "active";
                    return <tr key={item.id}>
                      <td><code className="key-mask">{item.prefix}-••••-••••-••••-{item.lastFour}</code><small className="key-subtitle">{durationLabels[item.durationDays] || `${item.durationDays} días`}</small></td>
                      <td><span className={`status-pill ${status}`}><i />{expired ? "Vencida" : item.paused ? "Pausada" : "Activa"}</span></td>
                      <td><span className="date-cell">{formatDate(item.expiresAt)}</span></td>
                      <td><span className="usage-cell"><strong>{item.usedUsers}</strong><span>/ {item.maxUsers}</span></span></td>
                      <td><div className="row-actions"><button className="action-button" disabled={busy || expired} onClick={() => pauseMutation.mutate({ id: item.id, paused: !item.paused })} title={item.paused ? "Reactivar" : "Pausar"}>{item.paused ? <CirclePlay size={16} /> : <CirclePause size={16} />}<span>{item.paused ? "Reactivar" : "Pausar"}</span></button><button className="action-button danger-action" disabled={busy} onClick={() => { if (window.confirm(`¿Eliminar y revocar ${item.prefix}-••••-${item.lastFour}?`)) deleteMutation.mutate({ id: item.id }); }} title="Eliminar"><Trash2 size={16} /><span>Eliminar</span></button></div></td>
                    </tr>;
                  })}
                </tbody></table></div>
              )}
            </section>
            <div className="footnote"><ShieldCheck size={15} /><span>La key completa solo se revela una vez al crearla. Guarda una copia segura para entregársela a tu usuario.</span></div>
          </>
        ) : (
          <>
            <p className="page-intro">Conecta tu APK al endpoint público. La validación y los límites se aplican en el servidor.</p>
            <section className="integration-banner"><div className="banner-icon"><Code2 size={22} /></div><div><div className="eyebrow">API REST · VERSIÓN 1</div><h2>Validación de licencias</h2><p>Tu APK envía la key y un identificador estable de instalación. No incluyas secretos administrativos dentro de la app.</p></div><span className="environment-pill"><span className="live-dot" /> LISTA</span></section>
            <div className="docs-grid">
              <section className="panel-card doc-card"><div className="section-heading"><div><div className="eyebrow">ENDPOINT</div><h2>Validar una key</h2></div></div><div className="endpoint-line"><span className="http-method">POST</span><code>/api/v1/keys/validate</code></div><p>URL de producción: reemplaza <code className="inline-code">TU-DOMINIO</code> por el dominio del servidor donde alojes la API.</p><div className="code-label">CUERPO JSON</div><pre>{`{
  "key": "POCOYO7X-ABCD-EFGH-JKLM-NPQR",
  "deviceId": "uuid-estable-de-la-instalacion"
}`}</pre><div className="code-label">RESPUESTA VÁLIDA</div><pre>{`{
  "valid": true,
  "reason": "active",
  "expiresAt": "2026-12-13T12:00:00.000Z",
  "usedUsers": 1,
  "maxUsers": 3
}`}</pre></section>
              <section className="panel-card doc-card"><div className="section-heading"><div><div className="eyebrow">ANDROID · KOTLIN</div><h2>Ejemplo de llamada</h2></div></div><p>Haz la llamada en un hilo de red (nunca en el hilo principal) y guarda un UUID de instalación para reutilizarlo en futuras validaciones.</p><div className="code-label">HTTPURLCONNECTION</div><pre className="code-tall">{`val payload = JSONObject()
  .put("key", licenseKey)
  .put("deviceId", installationId)
  .toString()

val connection = URL(
  "https://TU-DOMINIO/api/v1/keys/validate"
).openConnection() as HttpURLConnection

connection.requestMethod = "POST"
connection.setRequestProperty(
  "Content-Type", "application/json"
)
connection.doOutput = true
connection.outputStream.use { stream ->
  stream.write(payload.toByteArray(Charsets.UTF_8))
}

val responseCode = connection.responseCode
val responseStream = if (responseCode < 400)
  connection.inputStream else connection.errorStream
val result = JSONObject(responseStream.bufferedReader().readText())
val isValid = result.optBoolean("valid", false)
connection.disconnect()`}</pre><div className="notice notice-info"><ShieldCheck size={16} /><span>El servidor cuenta instalaciones, no personas verificadas. Reinstalar o borrar los datos de la app puede crear un nuevo identificador.</span></div></section>
              <section className="panel-card doc-card full-doc"><div className="section-heading"><div><div className="eyebrow">COMPORTAMIENTO</div><h2>Respuestas posibles</h2></div></div><div className="response-list"><div><span className="response-code success-code">active</span><p>Key válida; se activa esta instalación o se reconoce una ya registrada.</p></div><div><span className="response-code">invalid_key</span><p>La key no existe, fue eliminada o no tiene el formato admitido.</p></div><div><span className="response-code warning-code">paused</span><p>La key está pausada por el administrador.</p></div><div><span className="response-code warning-code">expired</span><p>La fecha de expiración ya pasó.</p></div><div><span className="response-code warning-code">user_limit_reached</span><p>Se alcanzó el máximo de instalaciones distintas.</p></div></div></section>
            </div>
          </>
        )}
        <footer className="page-footer"><span>POCOYO7X LICENSE CONSOLE</span><span>Gestión de licencias · API v1</span></footer>
      </main>
    </div>
  );
}
