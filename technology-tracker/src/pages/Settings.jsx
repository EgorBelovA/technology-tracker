export default function Settings() {
  return (
    <div>
      <div className='settings-info'>
        <div onClick={() => localStorage.clear()}>Clear all data</div>
      </div>
    </div>
  );
}
