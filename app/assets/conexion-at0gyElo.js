const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./esm-cpY5EGz2.js","./dist-BM50nWTC.js","./preload-helper-CRzLMJPS.js","./sql-wasm-browser-CYl2K4_8.js","./rolldown-runtime-Dd_uD5pT.js","./almacenWeb-BXcQQfEv.js","./nativo-_La-jTdf.js"])))=>i.map(i=>d[i]);
import{i as e,n as t}from"./rolldown-runtime-Dd_uD5pT.js";import{t as n}from"./preload-helper-CRzLMJPS.js";import{r}from"./nativo-_La-jTdf.js";async function i(e,t){try{await e.correr(`DROP TABLE IF EXISTS temp.__prueba_fts`),await e.correr(t),await e.correr(`INSERT INTO temp.__prueba_fts(texto) VALUES ('La transmutación de la energía')`);let n=await e.consultar(`SELECT count(*) AS n FROM temp.__prueba_fts WHERE __prueba_fts MATCH 'transmutacion OR transmut*'`);return Number(n[0]?.n)===1}catch{return!1}finally{try{await e.correr(`DROP TABLE IF EXISTS temp.__prueba_fts`)}catch{}}}async function a(e){return await i(e,`CREATE VIRTUAL TABLE temp.__prueba_fts USING fts5(texto, tokenize='unicode61 remove_diacritics 2')`)?{motor:`fts5`,quitarTildes:2}:await i(e,`CREATE VIRTUAL TABLE temp.__prueba_fts USING fts4(texto, tokenize=unicode61 "remove_diacritics=2")`)?{motor:`fts4`,quitarTildes:2}:await i(e,`CREATE VIRTUAL TABLE temp.__prueba_fts USING fts4(texto, tokenize=unicode61 "remove_diacritics=1")`)?{motor:`fts4`,quitarTildes:1}:{motor:`ninguno`,quitarTildes:1}}function o(e,t){return e===`fts5`?`CREATE VIRTUAL TABLE fragmentos_fts USING fts5(texto, content='fragmentos', content_rowid='id', tokenize='unicode61 remove_diacritics ${t}')`:e===`fts4`?`CREATE VIRTUAL TABLE fragmentos_fts USING fts4(content="fragmentos", texto, tokenize=unicode61 "remove_diacritics=${t}")`:null}function s(e){return e===`fts5`?`INSERT INTO fragmentos_fts(rowid, texto) SELECT id, texto FROM fragmentos WHERE libro_id = ?`:e===`fts4`?`INSERT INTO fragmentos_fts(docid, texto) SELECT id, texto FROM fragmentos WHERE libro_id = ?`:null}function c(e){return e===`fts5`?`INSERT INTO fragmentos_fts(fragmentos_fts, rowid, texto) SELECT 'delete', id, texto FROM fragmentos WHERE libro_id = ?`:e===`fts4`?`DELETE FROM fragmentos_fts WHERE docid IN (SELECT id FROM fragmentos WHERE libro_id = ?)`:null}var l=[async e=>{await e.ejecutar(`
CREATE TABLE IF NOT EXISTS maestros(
  id TEXT PRIMARY KEY, nombre TEXT NOT NULL, iniciales TEXT, color TEXT,
  biografia TEXT, foto_path TEXT, orden INTEGER,
  fuentes TEXT, nota_derechos TEXT
);
CREATE TABLE IF NOT EXISTS catalogo(
  id INTEGER PRIMARY KEY AUTOINCREMENT, maestro_id TEXT NOT NULL, titulo TEXT NOT NULL,
  anio INTEGER, url_descarga TEXT, oculto INTEGER DEFAULT 0, libro_id INTEGER,
  agregado_por_usuario INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_catalogo_maestro ON catalogo(maestro_id);
CREATE TABLE IF NOT EXISTS libros(
  id INTEGER PRIMARY KEY AUTOINCREMENT, maestro_id TEXT NOT NULL, titulo TEXT NOT NULL,
  archivo_path TEXT NOT NULL, formato TEXT NOT NULL,
  hash TEXT UNIQUE, paginas INTEGER,
  estado TEXT NOT NULL, error TEXT, progreso_lectura REAL DEFAULT 0, ultima_pagina INTEGER,
  creado TEXT DEFAULT CURRENT_TIMESTAMP,
  archivo_nombre TEXT, tamano INTEGER, portada_path TEXT, anio INTEGER
);
CREATE TABLE IF NOT EXISTS capitulos(id INTEGER PRIMARY KEY, libro_id INTEGER, titulo TEXT, pagina INTEGER, orden INTEGER);
CREATE INDEX IF NOT EXISTS idx_capitulos_libro ON capitulos(libro_id);
CREATE TABLE IF NOT EXISTS fragmentos(
  id INTEGER PRIMARY KEY, libro_id INTEGER NOT NULL, orden INTEGER,
  pagina_inicio INTEGER, pagina_fin INTEGER, capitulo_id INTEGER,
  texto TEXT NOT NULL, emb BLOB
);
CREATE INDEX IF NOT EXISTS idx_fragmentos_libro ON fragmentos(libro_id);
CREATE TABLE IF NOT EXISTS imagenes(id INTEGER PRIMARY KEY, libro_id INTEGER, pagina INTEGER, path TEXT, ancho INTEGER, alto INTEGER, descripcion TEXT);
CREATE INDEX IF NOT EXISTS idx_imagenes_libro ON imagenes(libro_id);
CREATE TABLE IF NOT EXISTS recetas(
  id INTEGER PRIMARY KEY, libro_id INTEGER, pagina INTEGER, fragmento_id INTEGER,
  titulo TEXT, dolencias TEXT, plantas TEXT, preparacion TEXT, dosis TEXT, acompana TEXT,
  texto_literal TEXT NOT NULL, imagen_id INTEGER, estado TEXT DEFAULT 'pendiente_revision', notas_usuario TEXT
);
CREATE TABLE IF NOT EXISTS practicas(
  id INTEGER PRIMARY KEY, libro_id INTEGER, pagina INTEGER, fragmento_id INTEGER,
  titulo TEXT, categoria TEXT, pasos TEXT, horario TEXT, mantra TEXT, texto_literal TEXT NOT NULL,
  imagen_id INTEGER, estado TEXT DEFAULT 'pendiente_revision', notas_usuario TEXT
);
CREATE TABLE IF NOT EXISTS mantras(
  id INTEGER PRIMARY KEY, libro_id INTEGER, pagina INTEGER,
  mantra TEXT NOT NULL, pronunciacion TEXT, para_que TEXT, texto_literal TEXT, audio_path TEXT,
  estado TEXT DEFAULT 'pendiente_revision'
);
CREATE TABLE IF NOT EXISTS glosario(
  id INTEGER PRIMARY KEY, termino TEXT NOT NULL, maestro_id TEXT,
  definicion_literal TEXT NOT NULL, libro_id INTEGER, pagina INTEGER,
  estado TEXT DEFAULT 'pendiente_revision'
);
CREATE TABLE IF NOT EXISTS citas(
  id INTEGER PRIMARY KEY, fecha TEXT NOT NULL, slot TEXT NOT NULL,
  fragmento_id INTEGER, libro_id INTEGER, pagina INTEGER,
  texto TEXT NOT NULL, tema TEXT, reflexion TEXT,
  practica_id INTEGER, favorita INTEGER DEFAULT 0, mostrada INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS preguntas(id INTEGER PRIMARY KEY, texto TEXT, filtro_maestro TEXT, respuesta TEXT,
  sinonimos TEXT, creada TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS temas_estudio(id INTEGER PRIMARY KEY, pregunta_id INTEGER, titulo TEXT, notas TEXT);
CREATE TABLE IF NOT EXISTS marcadores(id INTEGER PRIMARY KEY, libro_id INTEGER, pagina INTEGER, titulo TEXT, creado TEXT);
CREATE TABLE IF NOT EXISTS subrayados(id INTEGER PRIMARY KEY, libro_id INTEGER, pagina INTEGER, texto TEXT, color TEXT, nota TEXT, creado TEXT,
  cfi TEXT);
CREATE TABLE IF NOT EXISTS diario(id INTEGER PRIMARY KEY, fecha TEXT, tipo TEXT,
  titulo TEXT, texto TEXT, etiquetas TEXT, simbolos_refs TEXT);
CREATE TABLE IF NOT EXISTS fotos(id INTEGER PRIMARY KEY, path TEXT, fecha TEXT, titulo TEXT, nota TEXT,
  album TEXT, diario_id INTEGER, planta TEXT);
CREATE TABLE IF NOT EXISTS calendario(id INTEGER PRIMARY KEY, practica_id INTEGER, titulo TEXT,
  hora TEXT, dias TEXT, aviso INTEGER DEFAULT 1, activo INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS registro_practica(id INTEGER PRIMARY KEY, practica_id INTEGER, fecha TEXT, minutos INTEGER, nota TEXT);
CREATE TABLE IF NOT EXISTS ajustes(clave TEXT PRIMARY KEY, valor TEXT);
CREATE TABLE IF NOT EXISTS cache_ia(clave TEXT PRIMARY KEY, valor TEXT, creado TEXT);
`);let{motor:t,quitarTildes:n}=await a(e),r=o(t,n);r&&await e.correr(r),await e.correr(`INSERT OR REPLACE INTO ajustes(clave, valor) VALUES('fts_motor', ?)`,[t])},async e=>{let t=async t=>new Set((await e.consultar(`PRAGMA table_info(${t})`)).map(e=>e.name)),n=async(n,r,i)=>{(await t(n)).has(r)||await e.correr(`ALTER TABLE ${n} ADD COLUMN ${r} ${i}`)};await n(`libros`,`texto_ocr`,`INTEGER DEFAULT 0`),await n(`libros`,`fichas_pagina`,`INTEGER DEFAULT 0`),await n(`libros`,`fichas_estado`,`TEXT`),await n(`practicas`,`duracion_min`,`INTEGER`),await n(`diario`,`audio_path`,`TEXT`),await n(`diario`,`transcripcion_auto`,`INTEGER DEFAULT 0`),await n(`diario`,`creado`,`TEXT`),await n(`fotos`,`receta_id`,`INTEGER`),await n(`citas`,`maestro_id`,`TEXT`),await n(`citas`,`referencia`,`TEXT`),await n(`citas`,`categoria_practica`,`TEXT`),await n(`calendario`,`duracion_min`,`INTEGER DEFAULT 10`),await n(`registro_practica`,`titulo`,`TEXT`),await e.ejecutar(`
CREATE INDEX IF NOT EXISTS idx_citas_fecha ON citas(fecha, slot);
CREATE UNIQUE INDEX IF NOT EXISTS idx_citas_unica ON citas(fecha, slot) WHERE slot IN ('principal', 'secundaria');
CREATE INDEX IF NOT EXISTS idx_recetas_libro ON recetas(libro_id);
CREATE INDEX IF NOT EXISTS idx_practicas_libro ON practicas(libro_id);
CREATE INDEX IF NOT EXISTS idx_mantras_libro ON mantras(libro_id);
CREATE INDEX IF NOT EXISTS idx_glosario_termino ON glosario(termino);
CREATE TABLE IF NOT EXISTS repaso(
  glosario_id INTEGER PRIMARY KEY, repeticiones INTEGER DEFAULT 0, intervalo INTEGER DEFAULT 0,
  facilidad REAL DEFAULT 2.5, proxima TEXT
);
CREATE TABLE IF NOT EXISTS biblia(
  id INTEGER PRIMARY KEY, libro INTEGER NOT NULL, capitulo INTEGER NOT NULL, versiculo INTEGER NOT NULL, texto TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_biblia_cap ON biblia(libro, capitulo);
CREATE TABLE IF NOT EXISTS biblia_libros(idx INTEGER PRIMARY KEY, nombre TEXT NOT NULL);
`);let r=(await e.consultar(`SELECT valor FROM ajustes WHERE clave='fts_motor'`))[0]?.valor;(await e.consultar(`SELECT name FROM sqlite_master WHERE name = 'biblia_fts'`)).length||(r===`fts5`?await e.correr(`CREATE VIRTUAL TABLE biblia_fts USING fts5(texto, content='biblia', content_rowid='id', tokenize='unicode61 remove_diacritics 2')`):r===`fts4`&&await e.correr(`CREATE VIRTUAL TABLE biblia_fts USING fts4(content="biblia", texto, tokenize=unicode61 "remove_diacritics=2")`))},async e=>{await e.ejecutar(`
CREATE TABLE IF NOT EXISTS videos(
  id INTEGER PRIMARY KEY, tipo TEXT NOT NULL, url TEXT, youtube_id TEXT, path TEXT,
  titulo TEXT, maestro_id TEXT, notas TEXT, libro_id INTEGER, pagina INTEGER, practica_id INTEGER, creado TEXT
);
CREATE TABLE IF NOT EXISTS musica(
  id INTEGER PRIMARY KEY, path TEXT, titulo TEXT, compositor TEXT, obra TEXT, lista TEXT,
  resena TEXT, resena_fecha TEXT, archivo_nombre TEXT, creado TEXT
);
CREATE TABLE IF NOT EXISTS traducciones(
  libro_id INTEGER NOT NULL, pagina INTEGER NOT NULL, idioma TEXT NOT NULL, texto TEXT NOT NULL, creado TEXT,
  PRIMARY KEY(libro_id, pagina, idioma)
);
`)},async e=>{await e.ejecutar(`
CREATE TABLE IF NOT EXISTS lectura(
  fecha TEXT NOT NULL, libro_id INTEGER NOT NULL, segundos INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(fecha, libro_id)
);
`)}];async function u(e){let t=await e.consultar(`PRAGMA user_version`),n=Number(t[0]?.user_version??0);for(;n<l.length;)await l[n](e),n++,await e.correr(`PRAGMA user_version = ${n}`);return n}async function d(e,t,n){return(await e.consultar(t,n))[0]}async function f(e,t){let n=await d(e,`SELECT count(*) AS n FROM maestros`);return Number(n?.n)>0?!1:(await e.lote(`INSERT INTO maestros(id, nombre, iniciales, color, orden, fuentes, nota_derechos) VALUES (?,?,?,?,?,?,?)`,t.maestros.map((e,t)=>[e.id,e.nombre,e.iniciales??null,e.color??null,t,JSON.stringify(e.fuentes??[]),e.nota_derechos??null])),await e.lote(`INSERT INTO catalogo(maestro_id, titulo, anio, url_descarga) VALUES (?,?,?,?)`,t.maestros.flatMap(e=>e.obras.map(t=>[e.id,t.titulo,t.anio??null,t.url_descarga??null]))),await e.correr(`INSERT OR REPLACE INTO ajustes(clave, valor) VALUES('catalogo_version', ?)`,[JSON.stringify(t.version??1)]),await e.correr(`INSERT OR REPLACE INTO ajustes(clave, valor) VALUES('orden_maestros', ?)`,[JSON.stringify(t.maestros.map(e=>e.id))]),!0)}async function p(e,t){await e.lote(`UPDATE catalogo SET url_descarga = ?
      WHERE maestro_id = ? AND titulo = ? AND agregado_por_usuario = 0
        AND (url_descarga IS NULL OR url_descarga = '')`,t.maestros.flatMap(e=>e.obras.filter(e=>e.url_descarga).map(t=>[t.url_descarga,e.id,t.titulo]))),await e.lote(`UPDATE catalogo SET url_descarga = ?
      WHERE maestro_id = ? AND titulo = ? AND agregado_por_usuario = 0 AND url_descarga = ?`,t.maestros.flatMap(e=>e.obras.filter(e=>e.url_anterior&&e.url_descarga).map(t=>[t.url_descarga,e.id,t.titulo,t.url_anterior])));let n=await d(e,`SELECT valor FROM ajustes WHERE clave = 'catalogo_version'`),r=n&&Number(JSON.parse(n.valor))||1,i=t.version??1;if(i>r){for(let n of t.maestros)for(let t of n.obras)(t.desde??1)<=r||await d(e,`SELECT 1 AS x FROM catalogo WHERE maestro_id = ? AND titulo = ?`,[n.id,t.titulo])||await e.correr(`INSERT INTO catalogo(maestro_id, titulo, anio, url_descarga) VALUES (?,?,?,?)`,[n.id,t.titulo,t.anio??null,t.url_descarga??null]);await e.correr(`INSERT OR REPLACE INTO ajustes(clave, valor) VALUES('catalogo_version', ?)`,[JSON.stringify(i)])}await e.lote(`UPDATE maestros SET nombre = ?, fuentes = ? WHERE id = ?`,t.maestros.map(e=>[e.nombre,JSON.stringify(e.fuentes??[]),e.id]))}var m=t({getDb:()=>y,getMotor:()=>b,iniciarDb:()=>v}),h=null,g=`ninguno`;async function _(){if(r){let{CapacitorSQLite:e,SQLiteConnection:t}=await n(async()=>{let{CapacitorSQLite:e,SQLiteConnection:t}=await import(`./esm-cpY5EGz2.js`);return{CapacitorSQLite:e,SQLiteConnection:t}},__vite__mapDeps([0,1,2]),import.meta.url),r=new t(e),i=(await r.isConnection(`intimo`,!1)).result?await r.retrieveConnection(`intimo`,!1):await r.createConnection(`intimo`,!1,`no-encryption`,1,!1);await i.open();let{DbNativa:a}=await n(async()=>{let{DbNativa:e}=await import(`./nativo-CZgN7Xzp.js`);return{DbNativa:e}},[],import.meta.url);return new a(i)}let t=(await n(async()=>{let{default:t}=await import(`./sql-wasm-browser-CYl2K4_8.js`).then(t=>e(t.default,1));return{default:t}},__vite__mapDeps([3,4]),import.meta.url)).default,i=(await n(async()=>{let{default:e}=await import(`./sql-wasm-C9hWYWoV.js`);return{default:e}},[],import.meta.url)).default,a=await t({locateFile:()=>i}),{DbSqlJs:o}=await n(async()=>{let{DbSqlJs:e}=await import(`./sqljs-Dtja4Oz8.js`);return{DbSqlJs:e}},[],import.meta.url),s=await n(()=>import(`./almacenWeb-BXcQQfEv.js`).then(e=>e.n),__vite__mapDeps([5,4,1]),import.meta.url);if(!s.PERSISTE_WEB)return new o(new a.Database);let{cargarArchivosWeb:c}=await n(async()=>{let{cargarArchivosWeb:e}=await import(`./nativo-_La-jTdf.js`).then(e=>e.o);return{cargarArchivosWeb:e}},__vite__mapDeps([6,4,1,5]),import.meta.url);await Promise.all([c(),s.pedirAlmacenPersistente()]);let l=await s.leerBaseWeb(),u=new o(new a.Database(l)),d=null,f=0,p=()=>{d&&clearTimeout(d),d=null,f=0,s.guardarBaseWeb(u.exportar()).catch(()=>{})};return u.alCambiar=()=>{d&&clearTimeout(d),f||=Date.now(),d=setTimeout(p,Date.now()-f>1e4?0:1500)},document.addEventListener(`visibilitychange`,()=>document.visibilityState===`hidden`&&d&&p()),window.addEventListener(`pagehide`,()=>d&&p()),u}async function v(){if(h)return h;let e=await _();await u(e);let t=await(await fetch(`./data/catalogo_maestros.json`)).json();return await f(e,t),await p(e,t),g=(await d(e,`SELECT valor FROM ajustes WHERE clave='fts_motor'`))?.valor??`ninguno`,h=e,e}function y(){if(!h)throw Error(`Base de datos no iniciada`);return h}function b(){return g}export{d as a,v as i,y as n,c as o,b as r,s,m as t};