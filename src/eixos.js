import {
  LineBasicMaterial,
  BufferGeometry, 
  Line,
  Vector3
} from 'three'

const eixos = () => {
  const pointsX = [
    new Vector3(-0.3, 0, 0),
    new Vector3(10, 0, 0)
  ]

  const pointsY = [
    new Vector3(0, -0.3, 0),
    new Vector3(0, 10, 0)
  ]
  
  const pointsZ = [
    new Vector3(0, 0, -5),
    new Vector3(0, 0, 10)
  ]


  const materialLineZ = new LineBasicMaterial({ color: 0x0000FF })
  const materialLineY = new LineBasicMaterial({ color: 0x00FF00 })
  const materialLineX = new LineBasicMaterial({ color: 0xFF0000 })

  const gLineX = new BufferGeometry().setFromPoints(pointsX)
  const lineX = new Line(gLineX, materialLineX)

  const gLineY = new BufferGeometry().setFromPoints(pointsY)
  const lineY = new Line(gLineY, materialLineY)

  const gLineZ = new BufferGeometry().setFromPoints(pointsZ)
  const lineZ = new Line(gLineZ, materialLineZ)

  return { x: lineX, y: lineY, z: lineZ }
}

export default eixos

