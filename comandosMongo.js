use pizzaria;

db.createCollection("clientes")


db.clientes.insertOne(
	db.clientes.insertOne({
		"nome": "ananias",
		"endereco": {
		  "rua": "vergueiro",
		  "cidade": "são paulo"
		},
		"telefones": ["91234-5678", "98765-4321"]
	  })
	  
)

db.createCollection("pedidos")

db.pedidos.insertOne({
	id_cliente: "64977a68df2b4056f57afe6a",
	itens_pedido: [
	  { item: "pizza calabresa", qtd: 2, tam: "G", valor_unit: 25.50 },
	  { item: "pizza morango", qtd: 4, valor_unit: 7.00 },
	  { item: "coca-cola", qtd: 1, tam: "M", valor_unit: 18.00 }
	],
	data: "2023-06-18",
	valor_total: 97.00,
	entrega: true,
	endereço: {
	  rua: "vergueiro",
	  cidade: "são paulo"
	}
  })
  
  db.pedidos.insertOne({
	id_cliente: "64977edbdf2b4056f57afe72",
	itens_pedido: [
	  { item: "pizza calabresa", qtd: 2, tam: "M", valor_unit: 18.00 },
	  { item: "pizza morango", qtd: 4, valor_unit: 7.00 },
	  { item: "coca-cola", qtd: 1, tam: "500ml", valor_unit: 15.00 }
	],
	data: "2023-06-18",
	valor_total: 79.00,
	entrega: false,
	numero_mesa: 4
  })
  
  
	

	


db.createCollection("itens")

db.itens.insertOne({
	pizzas: [
	  { 
		sabor: "morango",
		preço: 12,
		tamanhos: [
		  { tamanho: "p", preço: 10 },
		  { tamanho: "m", preço: 12 },
		  { tamanho: "g", preço: 20 }
		]
	  },
	  { 
		sabor: "calabresa",
		preço: 12,
		tamanhos: [
		  { tamanho: "p", preço: 10 },
		  { tamanho: "m", preço: 12 },
		  { tamanho: "g", preço: 20 }
		]
	  }
	]
  })
  

  db.itens.insertOne({
	bebidas: [
	  { sabor: "coca-cola", tamanho: "500ml", valor: 10.00 }
	]
  })
  

  //updattet no nome na tabela clientes
  db.clientes.updateOne( { nome: "ananias" }, { $set: { nome:" Jefferson" } } ) 

  db.clientes.find( { nome: "Jefferson" } ) 

  // fazendo delette na tabela clientes

  //inserindo um cliente para ser excluido
  db.clientes.insertOne(
	db.clientes.insertOne({
		"nome": "joão",
		"endereco": {
		  "rua": "vergueiro",
		  "cidade": "são paulo"
		},
		"telefones": "91234-5678"
	  })
	  
)

//deletando
db.clientes.deleteOne({ nome: "joão" })


//consulta simples
db.clientes.find( { nome: "Jefferson" } ) 

// consulta com condição

db.clientes.insertOne(
	db.clientes.insertOne({
		"nome": "thiago",
		"age": 25,
		"endereco": {
		  "rua": "vergueiro",
		  "cidade": "são paulo"
		},
		"telefones": "91234-5678"
	  })
)

// condição entre idades 
db.clientes.find( { "age" : { "$gte" : 20 , "$lte" : 30} } )


// aggregatte de lucros da pizzaria em vendas de pedidos em um dia especifico(group by)
db.pedidos.aggregate([
	
	{
	  $match: { data:  "2023-06-18" }
	},

	{
	  $group: { _id: "$data", total: { $sum: "$valor_total"} }
	}
  ])

// lookup(join) para retornar os pedidos e os detalhes dos clientes que fizeram o pedido 

db.pedidos.aggregate([
	{
	  $lookup: {
		from: "clientes",
		localField: "cpf_cliente",
		foreignField: "cpf",
		as: "detalhes_cliente",
	  }
	}
  ])
  