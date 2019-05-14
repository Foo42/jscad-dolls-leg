function main(){
  const max = 500
  const lowerLegWidth = 14;
  const lowerLegInterRadiusLength = 113;
  const lowerLegHeight = 10;
  

  const upperLegWidth = 12.75;
  const upperLegInterRadiusLength = 48 - (upperLegWidth/2);
  const upperLegSlotWidth = 3; // this is an estimation. not measured
  const upperLengthSlotLength = 23.73;
  const upperLegHeight = 3.13;
  const legAngle = 120 // this is an estimation. not measured

  const pinDiameter = 2.48
  const pinHoleClearance = 0.5
  const pinHoleDiameter = pinDiameter + pinHoleClearance

  const lowerLegPart = linear_extrude({height: lowerLegHeight},
    hull(
      circle({r:lowerLegWidth/2, center: true}),
      translate([0, lowerLegInterRadiusLength],
        circle({r:lowerLegWidth/2, center: true})
      )
    )
  )

  const upperLegPart = rotate([0,0,360-legAngle], 
    linear_extrude({height:upperLegHeight},
    difference(
      hull(
        circle({r:upperLegWidth/2, center: true}),
        translate([0, upperLegInterRadiusLength],
          circle({r:upperLegWidth/2, center: true})
        )
      ),
      hull(
        translate(
          [0, upperLegInterRadiusLength],
          circle({r: upperLegSlotWidth/2, center: true})
        ),
        translate(
          [0, upperLegInterRadiusLength - upperLengthSlotLength],
          circle({r: upperLegSlotWidth/2, center: true})
        ) 
      )
    ))
  )

  const pinHole = linear_extrude({height:max}, circle({r:pinHoleDiameter/2, center: true}))

  return difference(union(lowerLegPart, upperLegPart), pinHole)
}