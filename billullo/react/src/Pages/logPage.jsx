

export function LogPage() {
  return (
    <>
      <Navbar setScreen={setScreen} />
      {screens[screen]}
    </>
  )
}
