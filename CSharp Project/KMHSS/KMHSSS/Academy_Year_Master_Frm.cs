using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Academy_Year_Master_Frm : Form
    {
        string query, strayid;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Academy_Year_Master_Frm()
        {
            InitializeComponent();
        }

        private void Academy_Year_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Alert_Msg_Lbl.Visible = false;
                Auto_Num();
                Fill_Grid();
                SYear_Txt.Focus();
                AY_Date_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }        

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select AY_Id from Academy_Year_Master_Table", con);
                String AY_Id = "AYID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        AY_Id = dr[0].ToString();
                        AY_Id = AY_Id.Replace("AYID", "");
                        int no = Convert.ToInt32(AY_Id);
                        no++;
                        AY_Id = "AYID" + no.ToString();
                    }
                }
                else
                {
                    AY_Id = "AYID101";
                }
                AY_Id_Txt.Text = AY_Id;
                dr.Close();
                con.Close();
                SYear_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select * from Academy_Year_Master_Table order by AY_ID desc";          
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Academy_Year_Master_dataGridView1.DataSource = dt;
                Academy_Year_Master_dataGridView1.ForeColor = Color.Black;
                Academy_Year_Master_dataGridView1.Columns[0].HeaderText = "AY Id";
                Academy_Year_Master_dataGridView1.Columns[1].HeaderText = "AY Date";
                Academy_Year_Master_dataGridView1.Columns[2].HeaderText = "SYear";
                Academy_Year_Master_dataGridView1.Columns[3].HeaderText = "EYear";
                Academy_Year_Master_dataGridView1.Columns[0].Width = 100;
                Academy_Year_Master_dataGridView1.Columns[1].Width = 100;
                Academy_Year_Master_dataGridView1.Columns[2].Width = 105;
                Academy_Year_Master_dataGridView1.Columns[3].Width = 105;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                AY_Id_Txt.Text = "";
                AY_Date_Dtp.Text = "";
                SYear_Txt.Text = "";
                EYear_Txt.Text = "";
                Auto_Num();
                SYear_Txt.Focus();
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Save_Btn.Enabled = true;             
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void Add()
        {
            if (AY_Id_Txt.Text != "" && AY_Date_Dtp.Text != "" && SYear_Txt.Text != "" && EYear_Txt.Text != "")
            {
                try
                {
                    query = "Select * From Academy_Year_Master_Table Where SYear='" + SYear_Txt.Text.ToString().Trim() + "' and EYear='" + EYear_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into Academy_Year_Master_Table values('" + AY_Id_Txt.Text.Trim() + "','" + AY_Date_Dtp.Text.Trim() + "','" + SYear_Txt.Text.Trim() + "','"+EYear_Txt.Text.Trim() +"')";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();

                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Inserted Successfully";
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Updat()
        {
            if (AY_Id_Txt.Text != "" && AY_Date_Dtp.Text != "" && SYear_Txt.Text != "" && EYear_Txt.Text != "")
            {
                try
                {
                    query = "update Academy_Year_Master_Table set SYear='" + SYear_Txt.Text.Trim() + "',EYear='" + EYear_Txt.Text.Trim() + "' where AY_Id='" + AY_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Updated Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Del()
        {
            if (AY_Id_Txt.Text != "" && AY_Date_Dtp.Text != "" && SYear_Txt.Text != "" && EYear_Txt.Text != "")
            {
                try
                {
                    query = "delete Academy_Year_Master_Table where AY_Id='" + AY_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Deleted Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }   
        
        private void Academy_Year_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strayid = Academy_Year_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                AY_Id_Txt.Text = Academy_Year_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                AY_Date_Dtp.Text = Academy_Year_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                SYear_Txt.Text = Academy_Year_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                EYear_Txt.Text = Academy_Year_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
                Clear_Btn.Enabled = true;
                SYear_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void SYear_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    EYear_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void EYear_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (EYear_Txt.Text != "")
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        SYear_Txt.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Please Fill All the Fields";
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }        

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Add();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Updat();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Del();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Alert_Msg_Lbl.Text = "";
                    Alert_Msg_Lbl.Visible = false;
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }    
    }
}
