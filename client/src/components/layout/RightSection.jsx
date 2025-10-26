import RightSectionTop from './RightSectionTop'
import RightSectionBot from './RightSectionBot'

function RightSection() {
  return (
    <section className='right-main h-full rounded hidden md:flex flex-col gap-2'>
      <RightSectionTop/>
      <RightSectionBot/>
    </section>
)
}

export default RightSection