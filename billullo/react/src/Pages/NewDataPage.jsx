

export function NewDataPage() {
  return (
    <>
      <Navbar setScreen={setScreen} />
      {screens[screen]}
    </>
  )
}
